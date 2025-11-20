import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task3() {
  const [n, setN] = useState(10);
  const [k, setK] = useState(3);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<{ sum: number; multiples: number[] } | null>(null);

  const generateNumbers = () => {
    if (n < 1 || n > 50) {
      toast.error('N должно быть от 1 до 50');
      return;
    }

    const newNumbers: number[] = [];
    for (let i = 0; i < n; i++) {
      newNumbers.push(Math.floor(Math.random() * 100) + 1);
    }
    setNumbers(newNumbers);
    setResult(null);
    toast.success(`Сгенерировано ${n} чисел`);
  };

  const calculate = () => {
    if (numbers.length === 0) {
      toast.error('Сначала сгенерируйте числа');
      return;
    }

    if (k < 1) {
      toast.error('K должно быть больше 0');
      return;
    }

    const multiples = numbers.filter(num => num % k === 0);
    const sum = multiples.reduce((acc, num) => acc + num, 0);

    setResult({ sum, multiples });
    toast.success('Расчет выполнен');
  };

  const saveToFile = () => {
    if (!result) {
      toast.error('Сначала выполните расчет');
      return;
    }

    let content = `Задача 3: Сумма элементов кратных ${k}\n\n`;
    content += `Всего чисел: ${numbers.length}\n`;
    content += `Делитель K: ${k}\n\n`;
    content += `Элементы кратные ${k}:\n`;
    result.multiples.forEach((num, i) => {
      content += `${i + 1}. ${num}\n`;
    });
    content += `\nСумма: ${result.sum}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task3_result.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ListOrdered" className="text-primary" />
            Задача 3: Сумма элементов кратных К
          </CardTitle>
          <CardDescription>
            Генерация N натуральных чисел и нахождение суммы элементов, кратных К
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="n">Количество чисел (N)</Label>
              <Input
                id="n"
                type="number"
                min="1"
                max="50"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value) || 1)}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="k">Делитель (K)</Label>
              <Input
                id="k"
                type="number"
                min="1"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value) || 1)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateNumbers} className="gap-2">
              <Icon name="Sparkles" size={18} />
              Сгенерировать числа
            </Button>
            {numbers.length > 0 && (
              <>
                <Button onClick={calculate} variant="outline" className="gap-2">
                  <Icon name="Calculator" size={18} />
                  Вычислить сумму
                </Button>
                {result && (
                  <Button onClick={saveToFile} variant="outline" className="gap-2">
                    <Icon name="Download" size={18} />
                    Сохранить
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {numbers.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Список чисел (ListBox)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg mb-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {numbers.map((num, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded text-center font-mono font-semibold transition-all ${
                      result && num % k === 0
                        ? 'bg-primary text-primary-foreground scale-110'
                        : 'bg-background border'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Target" className="text-primary" />
                    <span className="font-semibold">Элементы кратные {k}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {result.multiples.map((num, i) => (
                      <span key={i} className="px-3 py-1 bg-primary text-primary-foreground rounded font-mono font-bold">
                        {num}
                      </span>
                    ))}
                  </div>
                  {result.multiples.length === 0 && (
                    <p className="text-muted-foreground">Нет элементов кратных {k}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-card border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Всего чисел</div>
                    <div className="text-3xl font-bold font-mono">{numbers.length}</div>
                  </div>
                  <div className="p-4 bg-card border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Кратных {k}</div>
                    <div className="text-3xl font-bold text-primary font-mono">{result.multiples.length}</div>
                  </div>
                  <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                    <div className="text-sm opacity-90 mb-1">Сумма</div>
                    <div className="text-3xl font-bold font-mono">{result.sum}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
