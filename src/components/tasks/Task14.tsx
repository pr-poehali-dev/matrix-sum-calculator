import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task14() {
  const [results, setResults] = useState<{ x: number; sin: number; cos: number }[]>([]);

  const calculate = () => {
    const data: { x: number; sin: number; cos: number }[] = [];
    
    for (let i = 0; i <= 10; i++) {
      const x = i * 0.1;
      data.push({
        x: Number(x.toFixed(4)),
        sin: Number(Math.sin(x).toFixed(4)),
        cos: Number(Math.cos(x).toFixed(4))
      });
    }

    setResults(data);
    toast.success('Таблица вычислена');
  };

  const saveToFile = () => {
    if (results.length === 0) {
      toast.error('Сначала выполните вычисление');
      return;
    }

    let content = 'Задача 14: Таблица Sin(x) и Cos(x)\n\n';
    content += 'X\t\tSin(x)\t\tCos(x)\n';
    content += '─'.repeat(40) + '\n';
    results.forEach(r => {
      content += `${r.x.toFixed(4)}\t\t${r.sin.toFixed(4)}\t\t${r.cos.toFixed(4)}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task14_sin_cos.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Activity" className="text-primary" />
            Задача 14: Таблица Sin(x) и Cos(x)
          </CardTitle>
          <CardDescription>
            Вычисление синуса и косинуса от 0 до 1 с шагом 0.1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={calculate} className="gap-2">
              <Icon name="Calculator" size={18} />
              Вычислить таблицу
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
            <CardTitle>Таблица значений (Memo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="p-3 text-left font-semibold">X</th>
                    <th className="p-3 text-center font-semibold">Sin(x)</th>
                    <th className="p-3 text-center font-semibold">Cos(x)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {results.map((row, i) => (
                    <tr key={i} className="hover:bg-muted transition-colors">
                      <td className="p-3 font-mono font-semibold">{row.x.toFixed(4)}</td>
                      <td className="p-3 text-center font-mono text-blue-600 font-bold">{row.sin.toFixed(4)}</td>
                      <td className="p-3 text-center font-mono text-green-600 font-bold">{row.cos.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Textarea
              value={results.map(r => `${r.x.toFixed(4)}\t${r.sin.toFixed(4)}\t${r.cos.toFixed(4)}`).join('\n')}
              readOnly
              rows={12}
              className="font-mono text-sm"
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="TrendingUp" className="text-blue-600" size={20} />
                  <span className="font-semibold text-blue-900">Синус</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-600">Мин:</span>
                    <span className="font-mono font-bold">{Math.min(...results.map(r => r.sin)).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Макс:</span>
                    <span className="font-mono font-bold">{Math.max(...results.map(r => r.sin)).toFixed(4)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="TrendingDown" className="text-green-600" size={20} />
                  <span className="font-semibold text-green-900">Косинус</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-600">Мин:</span>
                    <span className="font-mono font-bold">{Math.min(...results.map(r => r.cos)).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Макс:</span>
                    <span className="font-mono font-bold">{Math.max(...results.map(r => r.cos)).toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
