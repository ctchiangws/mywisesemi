
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface LoginProps {
  password: string;
  setPassword: (value: string) => void;
  handleLogin: () => void;
}

const Login = ({ password, setPassword, handleLogin }: LoginProps) => {
  return (
    <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Lock className="h-5 w-5 text-wisesemi" />
            Admin Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-wisesemi hover:bg-wisesemi-dark"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Login;
