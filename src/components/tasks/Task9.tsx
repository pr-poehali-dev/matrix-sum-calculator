import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task9() {
  const [array, setArray] = useState<number[]>([]);
  const [evenElements, setEvenElements] = useState<{ value: number; index: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSampleFile = () => {
    const n = 15;
    const numbers = Array.from({ length: n }, () => Math.floor(Math.random() * 100) - 50);
    const content = numbers.join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'array_m.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл-пример создан');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const numbers = text
        .split(/[\n,\s]+/)
        .filter(s => s.trim())
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n));

      if (numbers.length === 0) {
        toast.error('Файл не содержит чисел');
        return;
      }

      setArray(numbers);

      const evens: { value: number; index: number }[] = [];
      numbers.forEach((num, index) => {
        if (num % 2 === 0) {
          evens.push({ value: num, index: index + 1 });
        }
      });

      setEvenElements(evens);
      toast.success(`Загружено ${numbers.length} чисел, найдено ${evens.length} четных`);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Binary" className="text-primary" />
            Задача 9: Четные элементы массива
          </CardTitle>
          <CardDescription>
            Поиск количества и порядковых номеров четных элементов в массиве
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={generateSampleFile} variant="outline" className="gap-2">
              <Icon name="FileDown" size={18} />
              Создать файл-пример
            </Button>
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              className="gap-2"
            >
              <Icon name="Upload" size={18} />
              Загрузить файл
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </CardContent>
      </Card>

      {array.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Массив M(N)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-3">Все элементы массива:</div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {array.map((num, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded text-center font-mono font-semibold transition-all ${
                      num % 2 === 0
                        ? 'bg-primary text-primary-foreground scale-110'
                        : 'bg-background border'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Check" className="text-primary" size={24} />
                <span className="font-semibold text-lg">Четные элементы (LabeledEdit)</span>
              </div>
              
              <div className="mb-4 p-4 bg-background rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Количество четных элементов:</div>
                <div className="text-5xl font-bold text-primary font-mono">{evenElements.length}</div>
              </div>

              {evenElements.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Элементы и их порядковые номера:</div>
                  <div className="grid gap-2">
                    {evenElements.map((item, i) => (
                      <div key={i} className="p-3 bg-background rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {i + 1}
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Позиция в массиве</div>
                            <div className="font-mono font-bold">№ {item.index}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Значение</div>
                          <div className="text-2xl font-mono font-bold text-primary">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-background rounded-lg text-center text-muted-foreground">
                  В массиве нет четных элементов
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Всего элементов</div>
                <div className="text-3xl font-bold font-mono">{array.length}</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Процент четных</div>
                <div className="text-3xl font-bold font-mono text-primary">
                  {((evenElements.length / array.length) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
