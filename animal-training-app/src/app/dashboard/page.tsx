'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Menu from '@/components/Menu';
import TrainingLogView from '@/components/views/TrainingLogView';
import AnimalView from '@/components/views/AnimalView';
import AdminAnimalView from '@/components/views/AdminAnimalView';

type View = 'training-logs' | 'animals' | 'all-training' | 'all-animals' | 'all-users';

export default function Dashboard() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<View>('training-logs');
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user) {
    return null; 
  }

  return (
    <div className="flex h-[calc(100vh-102px)]">
      <Menu 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />
      <main className="flex-1 py-8">
        {currentView === 'training-logs' && <TrainingLogView />}
        {currentView === 'animals' && <AnimalView />}
        {currentView === 'all-animals' && <AdminAnimalView />}
        {/* {currentView === 'animals' && <AnimalsView />}
        {currentView === 'all-training' && <AllTrainingView />}
        {currentView === 'all-animals' && <AllAnimalsView />}
        {currentView === 'all-users' && <AllUsersView />} */}
      </main>
    </div>
  );
}