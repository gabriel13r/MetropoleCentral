import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

function Dashboard() {
  const { user, logoutMutation } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Perfil do Jogador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-blue-500">
                <AvatarImage src={user.avatar} alt={user.displayName || user.username} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{user.displayName || user.username}</h2>
                <p className="text-gray-400">Discord ID: {user.discordId}</p>
                <Button variant="outline" className="mt-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;