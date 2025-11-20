import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task8() {
  const [n, setN] = useState(10);
  const [result, setResult] = useState<{ sum: number; terms: { index: number; value: number; partialSum: number }[] } | null>(null);

  const calculate = () => {
    if (n < 1 || n > 1000) {
      toast.error('N должно быть от 1 до 1000');
      return;
    }

    let sum = 0;
    const terms: { index: number; value: number; partialSum: number }[] = [];

    for (let i = 1; i <= n; i++) {
      const value = 1 / i;
      sum += value;
      terms.push({ index: i, value, partialSum: sum });
    }

    setResult({ sum, terms });
    toast.success('Вычисление выполнено');
  };

  const saveToFile = () => {
    if (!result) {
      toast.error('Сначала выполните вычисление');
      return;
    }

    let content = `Задача 8: Сумма ряда 1 + 1/2 + 1/3 + ... + 1/N\n\n`;
    content += `N = ${n}\n\n`;
    content += `№\t1/n\t\tЧастичная сумма\n`;
    content += `${'─'.repeat(50)}\n`;
    
    result.terms.forEach(term => {
      content += `${term.index}\t${term.value.toFixed(6)}\t${term.partialSum.toFixed(6)}\n`;
    });
    
    content += `\nИтоговая сумма: ${result.sum.toFixed(6)}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task8_sum_series.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Sigma" className="text-primary" />
            Задача 8: Сумма ряда 1 + 1/2 + 1/3 + ... + 1/N
          </CardTitle>
          <CardDescription>
            Вычисление суммы гармонического ряда до N элементов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="n">Количество элементов (N)</Label>
            <Input
              id="n"
              type="number"
              min="1"
              max="1000"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value) || 1)}
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="gap-2">
              <Icon name="Calculator" size={18} />
              Вычислить сумму
            </Button>
            {result && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить в файл
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат (RichEdit)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Sigma" className="text-primary" size={24} />
                <span className="font-semibold text-lg">Итоговая сумма ряда</span>
              </div>
              <div className="text-6xl font-bold text-primary font-mono">{result.sum.toFixed(6)}</div>
              <div className="text-sm text-muted-foreground mt-2">
                Сумма {n} элементов гармонического ряда
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-3 font-semibold text-sm flex">
                <div className="w-16">№</div>
                <div className="flex-1">Элемент (1/n)</div>
                <div className="flex-1">Частичная сумма</div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {result.terms.map(term => (
                  <div key={term.index} className="p-3 border-t flex hover:bg-muted/50 transition-colors">
                    <div className="w-16 font-mono font-semibold text-primary">{term.index}</div>
                    <div className="flex-1 font-mono">{term.value.toFixed(6)}</div>
                    <div className="flex-1 font-mono font-semibold">{term.partialSum.toFixed(6)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Первый элемент</div>
                <div className="text-2xl font-bold font-mono">{result.terms[0].value.toFixed(6)}</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Последний элемент</div>
                <div className="text-2xl font-bold font-mono">{result.terms[result.terms.length - 1].value.toFixed(6)}</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Элементов</div>
                <div className="text-2xl font-bold font-mono text-primary">{n}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
