import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task15() {
  const [results, setResults] = useState<{ k: number; a: number; b: number; value: number }[]>([]);

  const calculate = () => {
    const data: { k: number; a: number; b: number; value: number }[] = [];
    
    for (let k = 1; k <= 25; k++) {
      const a = Math.random() * 10;
      const b = Math.random() * 10;
      const value = Math.pow(a, 2) + Math.pow(b, 2);
      data.push({ k, a, b, value });
    }

    setResults(data);
    toast.success('25 значений вычислено');
  };

  const saveToFile = () => {
    if (results.length === 0) {
      toast.error('Сначала выполните вычисление');
      return;
    }

    let content = 'Задача 15: Вычисление 25 значений функции f(a,b) = a² + b²\n\n';
    content += 'K\tA\t\tB\t\tРезультат\n';
    content += '─'.repeat(60) + '\n';
    results.forEach(r => {
      content += `${r.k}\t${r.a.toFixed(2)}\t\t${r.b.toFixed(2)}\t\t${r.value.toFixed(2)}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task15_values.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Calculator" className="text-primary" />
            Задача 15: Вычисление 25 значений функции
          </CardTitle>
          <CardDescription>
            Вычисление f(a,b) = a² + b² для 25 случайных пар чисел
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={calculate} className="gap-2">
              <Icon name="Shuffle" size={18} />
              Вычислить 25 значений
            </Button>
            {results.length > 0 && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить в файл
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результаты (Memo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={results.map(r => `${r.k}. a=${r.a.toFixed(2)}, b=${r.b.toFixed(2)} → ${r.value.toFixed(2)}`).join('\n')}
              readOnly
              rows={12}
              className="font-mono text-sm"
            />

            <div className="overflow-x-auto max-h-96">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-primary text-primary-foreground sticky top-0">
                  <tr>
                    <th className="p-2">K</th>
                    <th className="p-2">A</th>
                    <th className="p-2">B</th>
                    <th className="p-2">A²</th>
                    <th className="p-2">B²</th>
                    <th className="p-2">Сумма</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {results.map((r, i) => (
                    <tr key={i} className="hover:bg-muted transition-colors">
                      <td className="p-2 text-center font-semibold">{r.k}</td>
                      <td className="p-2 text-center font-mono">{r.a.toFixed(2)}</td>
                      <td className="p-2 text-center font-mono">{r.b.toFixed(2)}</td>
                      <td className="p-2 text-center font-mono text-blue-600">{Math.pow(r.a, 2).toFixed(2)}</td>
                      <td className="p-2 text-center font-mono text-green-600">{Math.pow(r.b, 2).toFixed(2)}</td>
                      <td className="p-2 text-center font-mono font-bold text-primary">{r.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Минимум</div>
                <div className="text-2xl font-bold font-mono">{Math.min(...results.map(r => r.value)).toFixed(2)}</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Среднее</div>
                <div className="text-2xl font-bold font-mono text-primary">
                  {(results.reduce((sum, r) => sum + r.value, 0) / 25).toFixed(2)}
                </div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Максимум</div>
                <div className="text-2xl font-bold font-mono">{Math.max(...results.map(r => r.value)).toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
