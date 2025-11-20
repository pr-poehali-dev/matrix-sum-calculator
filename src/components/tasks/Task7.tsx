import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task7() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [min, setMin] = useState<{ value: number; row: number; col: number } | null>(null);

  const generateAndSave = () => {
    if (rows < 1 || rows > 10 || cols < 1 || cols > 10) {
      toast.error('Размеры должны быть от 1 до 10');
      return;
    }

    const matrix: number[][] = [];
    let minVal = Infinity;
    let minRow = 0;
    let minCol = 0;

    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        const val = Math.floor(Math.random() * 51);
        row.push(val);
        
        if (val < minVal) {
          minVal = val;
          minRow = i;
          minCol = j;
        }
      }
      matrix.push(row);
    }

    setMin({ value: minVal, row: minRow, col: minCol });

    let content = `Матрица ${rows}x${cols}\n\n`;
    matrix.forEach(row => {
      content += row.map(val => val.toString().padStart(4, ' ')).join('') + '\n';
    });
    content += `\nМинимальный элемент: ${minVal}\n`;
    content += `Позиция: строка ${minRow + 1}, столбец ${minCol + 1}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task7_matrix_min.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Матрица сгенерирована и сохранена в файл');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Grid3x3" className="text-primary" />
            Задача 7: Минимальный элемент матрицы
          </CardTitle>
          <CardDescription>
            Генерация матрицы MxN случайными числами (0-50) и поиск минимума с сохранением в файл
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

          <Button onClick={generateAndSave} className="gap-2 w-full">
            <Icon name="Download" size={18} />
            Сгенерировать и сохранить в файл
          </Button>
        </CardContent>
      </Card>

      {min && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат сохранения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="TrendingDown" className="text-primary" size={24} />
                <span className="font-semibold text-lg">Минимальный элемент найден</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Значение</div>
                  <div className="text-4xl font-bold text-primary font-mono">{min.value}</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Строка</div>
                  <div className="text-4xl font-bold font-mono">{min.row + 1}</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Столбец</div>
                  <div className="text-4xl font-bold font-mono">{min.col + 1}</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-background rounded-lg flex items-center gap-2">
                <Icon name="FileCheck" className="text-green-600" size={20} />
                <span className="text-sm">Файл <code className="px-2 py-1 bg-muted rounded font-mono text-xs">task7_matrix_min.txt</code> сохранен</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Содержимое файла:</div>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Матрица {rows}×{cols} со случайными числами от 0 до 50</li>
                <li>Минимальный элемент и его позиция</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
