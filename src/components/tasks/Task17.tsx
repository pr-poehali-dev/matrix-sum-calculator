import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task17() {
  const [input, setInput] = useState('');
  const [evenNumbers, setEvenNumbers] = useState<number[]>([]);
  const [allNumbers, setAllNumbers] = useState<number[]>([]);

  const analyze = () => {
    const numbers = input.split(/[\s,]+/).map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (numbers.length === 0) {
      toast.error('Введите натуральные числа');
      return;
    }

    const evens = numbers.filter(n => n % 2 === 0);
    setAllNumbers(numbers);
    setEvenNumbers(evens);
    toast.success(evens.length > 0 ? `Найдено ${evens.length} четных` : 'Четных чисел нет');
  };

  const saveToFile = () => {
    const content = evenNumbers.length > 0 
      ? `Четные числа:\n${evenNumbers.join('\n')}`
      : 'Четных чисел в последовательности нет';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task17_even.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Filter" className="text-primary" />
            Задача 17: Четные числа последовательности
          </CardTitle>
          <CardDescription>
            Создание массива из четных чисел заданной последовательности
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Введите натуральные числа (через пробел или запятую):</Label>
            <Input
              placeholder="1 5 8 12 3 9 14..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={analyze} className="gap-2">
              <Icon name="Search" size={18} />
              Найти четные
            </Button>
            {evenNumbers.length > 0 && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {allNumbers.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат (LabeledEdit)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Исходная последовательность:</div>
              <div className="flex gap-2 flex-wrap">
                {allNumbers.map((n, i) => (
                  <span key={i} className={`px-3 py-1 rounded font-mono font-semibold ${
                    n % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-background border'
                  }`}>{n}</span>
                ))}
              </div>
            </div>
            
            {evenNumbers.length > 0 ? (
              <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-sm text-muted-foreground mb-3">Четные числа:</div>
                <div className="flex gap-2 flex-wrap mb-4">
                  {evenNumbers.map((n, i) => (
                    <span key={i} className="px-4 py-2 bg-primary text-primary-foreground rounded font-mono font-bold text-xl">{n}</span>
                  ))}
                </div>
                <div className="text-lg font-semibold">Всего: {evenNumbers.length}</div>
              </div>
            ) : (
              <div className="p-6 bg-muted rounded-lg text-center">
                <Icon name="AlertCircle" className="mx-auto mb-2 text-muted-foreground" size={32} />
                <div className="text-lg font-semibold">В последовательности нет четных чисел</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
