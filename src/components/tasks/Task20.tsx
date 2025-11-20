import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task20() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [result, setResult] = useState<{ min: number; max: number; sum: number } | null>(null);

  const calculate = () => {
    const numbers = [num1, num2, num3];
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const sum = min + max;
    setResult({ min, max, sum });
    toast.success('Вычисление выполнено');
  };

  const saveToFile = () => {
    if (!result) {
      toast.error('Сначала выполните вычисление');
      return;
    }

    const content = `Задача 20: Сумма большего и меньшего\n\nЧисла: ${num1}, ${num2}, ${num3}\n\nМинимум: ${result.min}\nМаксимум: ${result.max}\nСумма: ${result.sum}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task20_sum.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Plus" className="text-primary" />
            Задача 20: Сумма большего и меньшего
          </CardTitle>
          <CardDescription>
            Нахождение суммы наибольшего и наименьшего из трех чисел
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="num1">Число 1</Label>
              <Input
                id="num1"
                type="number"
                step="0.1"
                value={num1}
                onChange={(e) => setNum1(parseFloat(e.target.value) || 0)}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="num2">Число 2</Label>
              <Input
                id="num2"
                type="number"
                step="0.1"
                value={num2}
                onChange={(e) => setNum2(parseFloat(e.target.value) || 0)}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="num3">Число 3</Label>
              <Input
                id="num3"
                type="number"
                step="0.1"
                value={num3}
                onChange={(e) => setNum3(parseFloat(e.target.value) || 0)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="gap-2">
              <Icon name="Calculator" size={18} />
              Вычислить
            </Button>
            {result && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат (Label)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Введенные числа:</div>
              <div className="flex gap-4 justify-center">
                {[num1, num2, num3].map((n, i) => (
                  <div key={i} className={`p-4 rounded-lg font-mono font-bold text-3xl ${
                    n === result.min ? 'bg-blue-100 text-blue-700' :
                    n === result.max ? 'bg-green-100 text-green-700' :
                    'bg-background border'
                  }`}>
                    {n}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="TrendingDown" className="text-blue-600" size={24} />
                  <span className="font-semibold text-blue-900">Минимум</span>
                </div>
                <div className="text-5xl font-bold text-blue-700 font-mono">{result.min}</div>
              </div>

              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="TrendingUp" className="text-green-600" size={24} />
                  <span className="font-semibold text-green-900">Максимум</span>
                </div>
                <div className="text-5xl font-bold text-green-700 font-mono">{result.max}</div>
              </div>

              <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Plus" size={24} />
                  <span className="font-semibold">Сумма</span>
                </div>
                <div className="text-5xl font-bold font-mono">{result.sum}</div>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Формула:</div>
                <div className="text-2xl font-mono">
                  {result.min} + {result.max} = {result.sum}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
