import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, FileSignature, RefreshCw, Inbox } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { bpmApi, BPM_BASE_URL, BPM_LOGIN_URL } from '@/services/bpmApi';
import { BpmInboxItem, BpmRequestItem, BpmSummary } from '@/types';

const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

function SummarySection<T extends { request_id: string }>({
  icon,
  title,
  data,
  isLoading,
  isError,
  language,
  renderItem,
}: {
  icon: React.ReactNode;
  title: string;
  data: BpmSummary<T> | undefined;
  isLoading: boolean;
  isError: boolean;
  language: 'en' | 'zh';
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          {icon}
          {title}
        </h3>
        {data?.authenticated && (
          <Badge variant="secondary">{data.count}</Badge>
        )}
      </div>

      {isLoading && (
        <p className="text-sm text-gray-400">
          {language === 'zh' ? '載入中...' : 'Loading...'}
        </p>
      )}

      {!isLoading && isError && (
        <p className="text-sm text-red-500">
          {language === 'zh' ? '無法連線至簽核系統' : 'Could not reach WiseForm'}
        </p>
      )}

      {!isLoading && !isError && data && !data.authenticated && (
        <p className="text-sm text-gray-500">
          {language === 'zh' ? '請先' : 'Please '}
          <a
            href={BPM_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-wisesemi hover:text-wisesemi-dark underline"
          >
            {language === 'zh' ? '登入智騰簽核系統' : 'log in to WiseForm'}
          </a>
        </p>
      )}

      {!isLoading && !isError && data?.authenticated && data.items.length === 0 && (
        <p className="text-sm text-gray-400">
          {language === 'zh' ? '目前沒有項目' : 'Nothing here'}
        </p>
      )}

      {!isLoading && !isError && data?.authenticated && data.items.length > 0 && (
        <ul className="space-y-1">
          {data.items.map((item) => (
            <li key={item.request_id}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const WiseFormSummary = () => {
  const { language } = useLanguage();

  const inboxQuery = useQuery({
    queryKey: ['bpm', 'inbox'],
    queryFn: bpmApi.getInboxSummary,
    refetchInterval: REFRESH_INTERVAL_MS,
    retry: false,
  });

  const completedQuery = useQuery({
    queryKey: ['bpm', 'recently-completed'],
    queryFn: bpmApi.getRecentlyCompletedSummary,
    refetchInterval: REFRESH_INTERVAL_MS,
    retry: false,
  });

  const handleRefresh = () => {
    inboxQuery.refetch();
    completedQuery.refetch();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
            <FileSignature className="h-5 w-5 mr-2 text-wisesemi" />
            <a
              href={BPM_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-wisesemi hover:underline"
            >
              {language === 'zh' ? '智騰簽核系統' : 'WiseForm'}
            </a>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleRefresh}
            disabled={inboxQuery.isLoading || completedQuery.isLoading}
            title={language === 'zh' ? '手動更新' : 'Refresh'}
          >
            <RefreshCw className={`h-4 w-4 ${(inboxQuery.isFetching || completedQuery.isFetching) ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <SummarySection
          icon={<Inbox className="h-4 w-4 mr-1.5 text-blue-500" />}
          title={language === 'zh' ? '待我簽核' : 'Pending My Approval'}
          data={inboxQuery.data}
          isLoading={inboxQuery.isLoading}
          isError={inboxQuery.isError}
          language={language}
          renderItem={(item) => (
            <a
              href={item.url.startsWith('http') ? item.url : `${BPM_BASE_URL}${item.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-2 rounded-md hover:bg-gray-100 transition-colors group"
            >
              <span className="text-sm text-gray-700 group-hover:text-wisesemi-dark">
                {item.form_name}{item.serial ? `（${item.serial}）` : ''}
              </span>
              <span className="text-xs text-gray-400">
                {item.applicant} · {item.step_name}
              </span>
            </a>
          )}
        />
        <div className="mt-5 border-t pt-4">
          <SummarySection
            icon={<CheckCircle2 className="h-4 w-4 mr-1.5 text-green-600" />}
            title={language === 'zh' ? '近期完成的表單' : 'Recently Completed'}
            data={completedQuery.data}
            isLoading={completedQuery.isLoading}
            isError={completedQuery.isError}
            language={language}
            renderItem={(item) => (
              <a
                href={item.url.startsWith('http') ? item.url : `${BPM_BASE_URL}${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-2 rounded-md hover:bg-gray-100 transition-colors group"
              >
                <span className="text-sm text-gray-700 group-hover:text-wisesemi-dark">
                  {item.form_name}{item.serial ? `（${item.serial}）` : ''}
                </span>
                <span className="text-xs text-gray-400">{item.status_display}</span>
              </a>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WiseFormSummary;
