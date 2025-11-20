import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task13() {
  const [age, setAge] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const generateAge = () => {
    const randomAge = Math.floor(Math.random() * 80) + 1;
    setAge(randomAge);

    let cat = '';
    if (randomAge < 7) cat = 'Дошкольник';
    else if (randomAge < 18) cat = 'Ученик';
    else if (randomAge < 60) cat = 'Работник';
    else cat = 'Пенсионер';

    setCategory(cat);
    toast.success('Возраст сгенерирован');
  };

  const saveToFile = () => {
    if (age === null) {
      toast.error('Сначала сгенерируйте возраст');
      return;
    }

    const content = `Задача 13: Анализ возраста\n\nВозраст: ${age} лет\nКатегория: ${category}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task13_age.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'Дошкольник': return 'Baby';
      case 'Ученик': return 'GraduationCap';
      case 'Работник': return 'Briefcase';
      case 'Пенсионер': return 'Heart';
      default: return 'User';
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'Дошкольник': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Ученик': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Работник': return 'bg-green-100 text-green-700 border-green-200';
      case 'Пенсионер': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" className="text-primary" />
            Задача 13: Анализ возраста
          </CardTitle>
          <CardDescription>
            Определение возрастной категории: дошкольник, ученик, работник, пенсионер
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={generateAge} className="gap-2">
              <Icon name="Shuffle" size={18} />
              Сгенерировать возраст
            </Button>
            {age !== null && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить в файл
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {age !== null && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат (Edit)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`p-8 rounded-lg border-2 ${getCategoryColor()}`}>
              <div className="flex items-center justify-center mb-6">
                <Icon name={getCategoryIcon()} size={64} />
              </div>
              <div className="text-center">
                <div className="text-sm opacity-70 mb-2">Возраст</div>
                <div className="text-7xl font-bold font-mono mb-6">{age}</div>
                <div className="text-sm opacity-70 mb-2">Категория</div>
                <div className="text-4xl font-bold">{category}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div className={`p-3 rounded ${age < 7 ? 'bg-pink-100 border-2 border-pink-300' : 'bg-muted'}`}>
                <div className="font-semibold">Дошкольник</div>
                <div className="text-xs text-muted-foreground mt-1">0-6 лет</div>
              </div>
              <div className={`p-3 rounded ${age >= 7 && age < 18 ? 'bg-blue-100 border-2 border-blue-300' : 'bg-muted'}`}>
                <div className="font-semibold">Ученик</div>
                <div className="text-xs text-muted-foreground mt-1">7-17 лет</div>
              </div>
              <div className={`p-3 rounded ${age >= 18 && age < 60 ? 'bg-green-100 border-2 border-green-300' : 'bg-muted'}`}>
                <div className="font-semibold">Работник</div>
                <div className="text-xs text-muted-foreground mt-1">18-59 лет</div>
              </div>
              <div className={`p-3 rounded ${age >= 60 ? 'bg-purple-100 border-2 border-purple-300' : 'bg-muted'}`}>
                <div className="font-semibold">Пенсионер</div>
                <div className="text-xs text-muted-foreground mt-1">60+ лет</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
