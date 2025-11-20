import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task10() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [originalMatrix, setOriginalMatrix] = useState<number[][]>([]);
  const [doubledMatrix, setDoubledMatrix] = useState<number[][]>([]);

  const generate = () => {
    if (rows < 1 || rows > 10 || cols < 1 || cols > 10) {
      toast.error('Размеры должны быть от 1 до 10');
      return;
    }

    const original: number[][] = [];
    const doubled: number[][] = [];

    for (let i = 0; i < rows; i++) {
      const origRow: number[] = [];
      const doubRow: number[] = [];
      for (let j = 0; j < cols; j++) {
        const val = Math.floor(Math.random() * 21);
        origRow.push(val);
        doubRow.push(val * 2);
      }
      original.push(origRow);
      doubled.push(doubRow);
    }

    setOriginalMatrix(original);
    setDoubledMatrix(doubled);
    toast.success('Матрицы сгенерированы');
  };

  const saveToFile = () => {
    if (doubledMatrix.length === 0) {
      toast.error('Сначала сгенерируйте матрицы');
      return;
    }

    let content = `Задача 10: Удвоенная матрица Mas(${rows},${cols})\n\n`;
    content += `Исходная матрица (случайные числа 0-20):\n`;
    originalMatrix.forEach(row => {
      content += row.map(val => val.toString().padStart(4, ' ')).join('') + '\n';
    });
    
    content += `\nУдвоенная матрица (значения × 2):\n`;
    doubledMatrix.forEach(row => {
      content += row.map(val => val.toString().padStart(4, ' ')).join('') + '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task10_double_matrix.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Copy" className="text-primary" />
            Задача 10: Удвоенная матрица
          </CardTitle>
          <CardDescription>
            Создание матрицы с удвоенными значениями исходной матрицы случайных чисел
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rows">Количество строк (M)</Label>
              <Input
                id="rows"
                type="number"
                min="1"
                max="10"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="cols">Количество столбцов (N)</Label>
              <Input
                id="cols"
                type="number"
                min="1"
                max="10"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generate} className="gap-2">
              <Icon name="Sparkles" size={18} />
              Сгенерировать
            </Button>
            {originalMatrix.length > 0 && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить в файл
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {originalMatrix.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6 animate-scale-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Исходная матрица (StringGrid)</CardTitle>
              <CardDescription>Случайные числа от 0 до 20</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {originalMatrix.map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td
                            key={j}
                            className="border p-3 text-center font-mono font-semibold text-lg bg-muted hover:bg-muted/70 transition-colors"
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Icon name="ArrowRight" className="text-primary" />
                Удвоенная матрица (в файле)
              </CardTitle>
              <CardDescription>Каждый элемент умножен на 2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {doubledMatrix.map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td
                            key={j}
                            className="border p-3 text-center font-mono font-bold text-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {originalMatrix.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-base">Статистика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Размер</div>
                <div className="text-2xl font-bold font-mono">{rows}×{cols}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Элементов</div>
                <div className="text-2xl font-bold font-mono">{rows * cols}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Макс. исходной</div>
                <div className="text-2xl font-bold font-mono">{Math.max(...originalMatrix.flat())}</div>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-sm text-muted-foreground mb-1">Макс. удвоенной</div>
                <div className="text-2xl font-bold font-mono text-primary">{Math.max(...doubledMatrix.flat())}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
