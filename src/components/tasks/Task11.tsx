import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task11() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(2);
  const [step, setStep] = useState(0.2);
  const [results, setResults] = useState<{ x: number; value: number }[]>([]);

  const calculate = () => {
    if (step <= 0) {
      toast.error('Шаг должен быть больше 0');
      return;
    }

    const data: { x: number; value: number }[] = [];
    let x = start;
    
    while (x <= end + 0.0001) {
      const value = Math.pow(x, 2) + 2 * x + 1;
      data.push({ x: Number(x.toFixed(2)), value });
      x += step;
    }

    setResults(data);
    toast.success(`Вычислено ${data.length} значений`);
  };

  const saveToFile = () => {
    if (results.length === 0) {
      toast.error('Сначала выполните вычисление');
      return;
    }

    let content = `Задача 11: Вычисление функции f(x) = x² + 2x + 1\n\n`;
    content += `Диапазон: [${start}, ${end}], шаг: ${step}\n\n`;
    content += `X\t\tf(x)\n`;
    content += `${'─'.repeat(30)}\n`;
    results.forEach(r => {
      content += `${r.x.toFixed(2)}\t\t${r.value.toFixed(4)}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task11_series.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Function" className="text-primary" />
            Задача 11: Вычисление и распечатка членов ряда
          </CardTitle>
          <CardDescription>
            Вычисление значений функции f(x) = x² + 2x + 1 на заданном интервале
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="start">Начало</Label>
              <Input
                id="start"
                type="number"
                step="0.1"
                value={start}
                onChange={(e) => setStart(parseFloat(e.target.value) || 0)}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="end">Конец</Label>
              <Input
                id="end"
                type="number"
                step="0.1"
                value={end}
                onChange={(e) => setEnd(parseFloat(e.target.value) || 0)}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="step">Шаг</Label>
              <Input
                id="step"
                type="number"
                step="0.1"
                min="0.01"
                value={step}
                onChange={(e) => setStep(parseFloat(e.target.value) || 0.1)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="gap-2">
              <Icon name="Calculator" size={18} />
              Вычислить ряд
            </Button>
            {results.length > 0 && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Члены ряда (RichEdit)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-mono">f(x) = x² + 2x + 1</div>
            </div>

            <Textarea 
              value={results.map(r => `x=${r.x.toFixed(2)}: f(x)=${r.value.toFixed(4)}`).join('\n')}
              readOnly
              rows={Math.min(results.length, 15)}
              className="font-mono"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Значений</div>
                <div className="text-2xl font-bold font-mono text-primary">{results.length}</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Мин. f(x)</div>
                <div className="text-2xl font-bold font-mono">
                  {Math.min(...results.map(r => r.value)).toFixed(2)}
                </div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Макс. f(x)</div>
                <div className="text-2xl font-bold font-mono">
                  {Math.max(...results.map(r => r.value)).toFixed(2)}
                </div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Среднее</div>
                <div className="text-2xl font-bold font-mono">
                  {(results.reduce((sum, r) => sum + r.value, 0) / results.length).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
