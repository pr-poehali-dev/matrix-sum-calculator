import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task6() {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [sum, setSum] = useState<number | null>(null);
  const [avg, setAvg] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSampleFile = () => {
    const sampleMatrix = Array.from({ length: 2 }, () =>
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 100))
    );
    
    let content = '';
    sampleMatrix.forEach(row => {
      row.forEach(val => {
        content += val + '\n';
      });
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'matrix_2x4.txt';
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
        .filter(n => !isNaN(n))
        .slice(0, 8);

      if (numbers.length !== 8) {
        toast.error('Файл должен содержать 8 чисел (матрица 2x4)');
        return;
      }

      const newMatrix = [
        numbers.slice(0, 4),
        numbers.slice(4, 8)
      ];

      setMatrix(newMatrix);
      
      const totalSum = numbers.reduce((acc, val) => acc + val, 0);
      const average = totalSum / 8;
      
      setSum(totalSum);
      setAvg(average);
      
      toast.success('Матрица загружена и вычислена');
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Table" className="text-primary" />
            Задача 6: Сумма массива Mas(2,4)
          </CardTitle>
          <CardDescription>
            Чтение матрицы 2x4 из файла, вычисление суммы и среднего арифметического
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

          <div className="p-3 bg-muted rounded-lg text-sm">
            <Icon name="Info" className="inline mr-2" size={16} />
            Файл должен содержать 8 целых чисел (по одному на строке или через пробел)
          </div>
        </CardContent>
      </Card>

      {matrix.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Матрица Mas(2,4) в StringGrid</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {matrix.map((row, i) => (
                    <tr key={i}>
                      {row.map((val, j) => (
                        <td
                          key={j}
                          className="border p-4 text-center font-mono font-bold text-xl bg-card hover:bg-muted transition-colors"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Plus" className="text-primary" size={24} />
                  <span className="font-semibold text-lg">Сумма элементов</span>
                </div>
                <div className="text-5xl font-bold text-primary font-mono">{sum}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Сумма всех 8 элементов матрицы
                </div>
              </div>

              <div className="p-6 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Divide" className="text-accent" size={24} />
                  <span className="font-semibold text-lg">Среднее арифметическое</span>
                </div>
                <div className="text-5xl font-bold text-accent font-mono">
                  {avg?.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Сумма / Количество элементов
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Строк</div>
                  <div className="font-mono font-bold text-2xl">2</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Столбцов</div>
                  <div className="font-mono font-bold text-2xl">4</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Элементов</div>
                  <div className="font-mono font-bold text-2xl">8</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Максимум</div>
                  <div className="font-mono font-bold text-2xl text-primary">
                    {Math.max(...matrix.flat())}
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
