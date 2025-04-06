
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitBranch, Share2, UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'editor' | 'viewer' | 'admin';
  avatarUrl?: string;
}

const CollaboratorList: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { 
      id: '1', 
      name: 'Martina Schröder', 
      email: 'martina@example.com', 
      role: 'editor',
      avatarUrl: '/placeholder.svg' 
    },
    { 
      id: '2', 
      name: 'Thomas Weber', 
      email: 'thomas@example.com', 
      role: 'viewer' 
    },
    { 
      id: '3', 
      name: 'Laura Fischer', 
      email: 'laura@example.com', 
      role: 'admin',
      avatarUrl: '/placeholder.svg' 
    },
  ]);
  
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const { toast } = useToast();

  const handleAddCollaborator = () => {
    if (!newCollaboratorEmail || !newCollaboratorEmail.includes('@')) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte gib eine gültige E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send an invitation to the email
    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      name: newCollaboratorEmail.split('@')[0], // Simple name from email
      email: newCollaboratorEmail,
      role: 'viewer', // Default role
    };

    setCollaborators([...collaborators, newCollaborator]);
    setNewCollaboratorEmail('');
    
    toast({
      title: "Einladung gesendet",
      description: `Einladung an ${newCollaboratorEmail} wurde gesendet.`,
    });
  };

  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
    toast({
      title: "Mitwirkender entfernt",
      description: "Der Mitwirkende wurde erfolgreich entfernt.",
    });
  };
  
  const handleChangeRole = (id: string, newRole: 'editor' | 'viewer' | 'admin') => {
    setCollaborators(
      collaborators.map(c => c.id === id ? { ...c, role: newRole } : c)
    );
    toast({
      title: "Rolle aktualisiert",
      description: "Die Rolle wurde erfolgreich aktualisiert.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <GitBranch className="w-5 h-5 text-harmony-purple" />
          <span>Gedanken-Kollaboration</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newCollaboratorEmail}
              onChange={(e) => setNewCollaboratorEmail(e.target.value)}
              placeholder="E-Mail des neuen Mitwirkenden"
              className="flex-1"
            />
            <Button 
              onClick={handleAddCollaborator}
              className="bg-harmony-purple hover:bg-harmony-purple/90"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Einladen
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mitwirkender</TableHead>
                  <TableHead>Rolle</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collaborators.map((collaborator) => (
                  <TableRow key={collaborator.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={collaborator.avatarUrl} />
                          <AvatarFallback>{collaborator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{collaborator.name}</div>
                          <div className="text-sm text-muted-foreground">{collaborator.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        collaborator.role === 'admin' 
                          ? 'bg-green-100 text-green-800' 
                          : collaborator.role === 'editor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {collaborator.role === 'admin' 
                          ? 'Administrator' 
                          : collaborator.role === 'editor' 
                            ? 'Bearbeiter' 
                            : 'Betrachter'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {collaborator.role !== 'admin' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleChangeRole(collaborator.id, 'admin')}
                          >
                            Zum Admin
                          </Button>
                        )}
                        {collaborator.role !== 'editor' && collaborator.role !== 'admin' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleChangeRole(collaborator.id, 'editor')}
                          >
                            Zum Editor
                          </Button>
                        )}
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRemoveCollaborator(collaborator.id)}
                        >
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-harmony-purple" />
            <span className="text-sm text-muted-foreground">Zusammenarbeit an Gedanken mit anderen InterfaceDNA Nutzern</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaboratorList;
