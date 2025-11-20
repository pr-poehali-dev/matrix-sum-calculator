import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task4() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [results, setResults] = useState<{
    values: [number, number, number];
    powers: [number, number, number];
    posCount: number;
    negCount: number;
  } | null>(null);

  const calculate = () => {
    const values: [number, number, number] = [num1, num2, num3];
    const powers: [number, number, number] = [0, 0, 0];
    let posCount = 0;
    let negCount = 0;

    values.forEach((val, i) => {
      if (val >= 0) {
        powers[i] = Math.pow(val, 2);
        posCount++;
      } else {
        powers[i] = Math.pow(val, 4);
        negCount++;
      }
    });

    setResults({ values, powers, posCount, negCount });
    toast.success('Вычисление выполнено');
  };

  const saveToFile = () => {
    if (!results) {
      toast.error('Сначала выполните вычисление');
      return;
    }

    let content = 'Задача 4: Возведение в степень\n\n';
    content += 'Исходные числа:\n';
    results.values.forEach((val, i) => {
      content += `${i + 1}. ${val}\n`;
    });
    content += '\nРезультаты:\n';
    results.values.forEach((val, i) => {
      const power = val >= 0 ? 2 : 4;
      content += `${val} → ${val}^${power} = ${results.powers[i]}\n`;
    });
    content += `\nПоложительных: ${results.posCount}\n`;
    content += `Отрицательных: ${results.negCount}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task4_result.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-primary" />
            Задача 4: Возведение в степень
          </CardTitle>
          <CardDescription>
            Неотрицательные числа возводим в квадрат, отрицательные — в четвертую степень
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
            {results && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить в файл
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результаты (LabeledEdit)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {results.values.map((val, i) => (
                <div key={i} className="p-4 border rounded-lg bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Число {i + 1}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      val >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {val >= 0 ? 'Неотрицательное' : 'Отрицательное'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-mono font-bold">{val}</div>
                    <Icon name="ArrowRight" className="text-muted-foreground" />
                    <div className="text-xl font-mono text-muted-foreground">
                      {val}^{val >= 0 ? '2' : '4'}
                    </div>
                    <Icon name="ArrowRight" className="text-muted-foreground" />
                    <div className="text-3xl font-mono font-bold text-primary">
                      {results.powers[i].toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Plus" className="text-green-600" size={20} />
                  <span className="font-semibold text-green-900">Положительных</span>
                </div>
                <div className="text-4xl font-bold text-green-700 font-mono">
                  {results.posCount}
                </div>
                <div className="text-sm text-green-600 mt-2">
                  Возведены в квадрат (степень 2)
                </div>
              </div>

              <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Minus" className="text-red-600" size={20} />
                  <span className="font-semibold text-red-900">Отрицательных</span>
                </div>
                <div className="text-4xl font-bold text-red-700 font-mono">
                  {results.negCount}
                </div>
                <div className="text-sm text-red-600 mt-2">
                  Возведены в четвертую степень
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
