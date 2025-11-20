import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task5() {
  const [pricePerKg, setPricePerKg] = useState(250);
  const [results, setResults] = useState<{ kg: number; price: number }[]>([]);

  const calculate = () => {
    if (pricePerKg <= 0) {
      toast.error('Цена должна быть больше 0');
      return;
    }

    const newResults = Array.from({ length: 10 }, (_, i) => ({
      kg: i + 1,
      price: (i + 1) * pricePerKg,
    }));

    setResults(newResults);
    toast.success('Таблица рассчитана');
  };

  const saveToFile = () => {
    if (results.length === 0) {
      toast.error('Сначала выполните расчет');
      return;
    }

    let content = `Стоимость конфет (цена за 1 кг: ${pricePerKg} руб.)\n\n`;
    content += 'Вес (кг)    Стоимость (руб.)\n';
    content += '─────────────────────────────\n';
    
    results.forEach(({ kg, price }) => {
      content += `   ${kg}          ${price}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task5_candy_prices.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Candy" className="text-primary" />
            Задача 5: Стоимость конфет
          </CardTitle>
          <CardDescription>
            Расчет стоимости от 1 до 10 кг конфет по заданной цене за килограмм
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="price">Цена за 1 кг (руб.)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(parseFloat(e.target.value) || 0)}
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="gap-2">
              <Icon name="Calculator" size={18} />
              Рассчитать таблицу
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
            <CardTitle>Таблица цен</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold">Вес (кг)</th>
                      <th className="py-3 px-4 text-right font-semibold">Стоимость (₽)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {results.map(({ kg, price }, index) => (
                      <tr 
                        key={kg} 
                        className="hover:bg-muted transition-colors"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <td className="py-3 px-4 font-mono font-semibold">{kg}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-primary">
                          {price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-1">Средняя стоимость</div>
                  <div className="text-3xl font-bold text-primary font-mono">
                    {(results.reduce((sum, r) => sum + r.price, 0) / results.length).toFixed(2)} ₽
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Минимум (1 кг)</div>
                  <div className="text-2xl font-bold font-mono">{results[0].price.toFixed(2)} ₽</div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Максимум (10 кг)</div>
                  <div className="text-2xl font-bold font-mono">{results[9].price.toFixed(2)} ₽</div>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <Icon name="Sparkles" className="text-accent mb-2" size={20} />
                  <div className="text-sm">
                    При покупке 10 кг вы получите <span className="font-bold">{(results[9].price / results[0].price).toFixed(0)}x</span> больше конфет, чем при покупке 1 кг
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
