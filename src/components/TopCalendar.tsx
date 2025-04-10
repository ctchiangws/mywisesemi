
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';

const TopCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-wisesemi" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm bg-white"
        />
      </CardContent>
    </Card>
  );
};

export default TopCalendar;
