import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Task1 from '@/components/tasks/Task1';
import Task2 from '@/components/tasks/Task2';
import Task3 from '@/components/tasks/Task3';
import Task4 from '@/components/tasks/Task4';
import Task5 from '@/components/tasks/Task5';
import Task6 from '@/components/tasks/Task6';
import Task7 from '@/components/tasks/Task7';
import Task8 from '@/components/tasks/Task8';
import Task9 from '@/components/tasks/Task9';
import Task10 from '@/components/tasks/Task10';
import Task11 from '@/components/tasks/Task11';
import Task12 from '@/components/tasks/Task12';
import Task13 from '@/components/tasks/Task13';
import Task14 from '@/components/tasks/Task14';
import Task15 from '@/components/tasks/Task15';
import Task16 from '@/components/tasks/Task16';
import Task17 from '@/components/tasks/Task17';
import Task18 from '@/components/tasks/Task18';
import Task19 from '@/components/tasks/Task19';
import Task20 from '@/components/tasks/Task20';
import DelphiInstructions from '@/components/DelphiInstructions';

const tasks = [
  { id: 1, title: 'Задача 1', description: 'Матрица MxN и максимум', implemented: true },
  { id: 2, title: 'Задача 2', description: 'Анализ массива A(12)', implemented: true },
  { id: 3, title: 'Задача 3', description: 'Сумма кратных К', implemented: true },
  { id: 4, title: 'Задача 4', description: 'Возведение в степень', implemented: true },
  { id: 5, title: 'Задача 5', description: 'Стоимость конфет', implemented: true },
  { id: 6, title: 'Задача 6', description: 'Сумма массива Mas(2,4)', implemented: true },
  { id: 7, title: 'Задача 7', description: 'Минимум матрицы', implemented: true },
  { id: 8, title: 'Задача 8', description: 'Сумма ряда', implemented: true },
  { id: 9, title: 'Задача 9', description: 'Четные элементы', implemented: true },
  { id: 10, title: 'Задача 10', description: 'Удвоенная матрица', implemented: true },
  { id: 11, title: 'Задача 11', description: 'Члены ряда', implemented: true },
  { id: 12, title: 'Задача 12', description: 'Добавление восклицаний', implemented: true },
  { id: 13, title: 'Задача 13', description: 'Анализ возраста', implemented: true },
  { id: 14, title: 'Задача 14', description: 'Таблица Sin/Cos', implemented: true },
  { id: 15, title: 'Задача 15', description: 'Вычисление 25 значений', implemented: true },
  { id: 16, title: 'Задача 16', description: 'Решение уравнения', implemented: true },
  { id: 17, title: 'Задача 17', description: 'Четные числа последовательности', implemented: true },
  { id: 18, title: 'Задача 18', description: 'Номера нулевых элементов', implemented: true },
  { id: 19, title: 'Задача 19', description: 'Слова на букву B', implemented: true },
  { id: 20, title: 'Задача 20', description: 'Сумма большего и меньшего', implemented: true },
];

export default function Index() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Calculator" className="text-primary-foreground" size={24} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Delphi Задачи</h1>
              <p className="text-sm text-muted-foreground">Интерактивный тренажер по программированию</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedTask(null);
                setShowInstructions(!showInstructions);
              }}
              className="gap-2"
            >
              <Icon name="Code" size={18} />
              {showInstructions ? 'Задачи' : 'Инструкции Delphi'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showInstructions ? (
          <div className="animate-fade-in">
            <DelphiInstructions />
          </div>
        ) : !selectedTask ? (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Выберите задачу</h2>
              <p className="text-muted-foreground">20 задач для практики работы с массивами, матрицами и файлами</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tasks.map((task, index) => (
                <Card 
                  key={task.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    task.implemented ? 'border-primary/20 hover:border-primary' : 'opacity-60'
                  }`}
                  onClick={() => task.implemented && setSelectedTask(task.id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-mono font-semibold">
                        {task.id}
                      </div>
                      {task.implemented && (
                        <Icon name="CheckCircle2" className="text-green-500" size={18} />
                      )}
                    </div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <CardDescription className="text-sm">{task.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-scale-in">
            <Button
              variant="ghost"
              onClick={() => setSelectedTask(null)}
              className="mb-6"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад к списку
            </Button>

            {selectedTask === 1 && <Task1 />}
            {selectedTask === 2 && <Task2 />}
            {selectedTask === 3 && <Task3 />}
            {selectedTask === 4 && <Task4 />}
            {selectedTask === 5 && <Task5 />}
            {selectedTask === 6 && <Task6 />}
            {selectedTask === 7 && <Task7 />}
            {selectedTask === 8 && <Task8 />}
            {selectedTask === 9 && <Task9 />}
            {selectedTask === 10 && <Task10 />}
            {selectedTask === 11 && <Task11 />}
            {selectedTask === 12 && <Task12 />}
            {selectedTask === 13 && <Task13 />}
            {selectedTask === 14 && <Task14 />}
            {selectedTask === 15 && <Task15 />}
            {selectedTask === 16 && <Task16 />}
            {selectedTask === 17 && <Task17 />}
            {selectedTask === 18 && <Task18 />}
            {selectedTask === 19 && <Task19 />}
            {selectedTask === 20 && <Task20 />}
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Образовательное приложение • 2025</p>
        </div>
      </footer>
    </div>
  );
}