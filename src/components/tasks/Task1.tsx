import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task1() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [max, setMax] = useState<{ value: number; row: number; col: number } | null>(null);

  const generateMatrix = () => {
    if (rows < 1 || rows > 10 || cols < 1 || cols > 10) {
      toast.error('Размеры должны быть от 1 до 10');
      return;
    }

    const newMatrix: number[][] = [];
    let maxVal = -Infinity;
    let maxRow = 0;
    let maxCol = 0;

    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        const val = Math.floor(Math.random() * 100) - 50;
        row.push(val);
        
        if (val > maxVal) {
          maxVal = val;
          maxRow = i;
          maxCol = j;
        }
      }
      newMatrix.push(row);
    }

    setMatrix(newMatrix);
    setMax({ value: maxVal, row: maxRow, col: maxCol });
    toast.success('Матрица сгенерирована');
  };

  const saveToFile = () => {
    if (matrix.length === 0) {
      toast.error('Сначала сгенерируйте матрицу');
      return;
    }

    let content = `Матрица ${rows}x${cols}\n\n`;
    
    matrix.forEach((row, i) => {
      content += row.map(val => val.toString().padStart(4, ' ')).join('') + '\n';
    });
    
    if (max) {
      content += `\nМаксимальный элемент: ${max.value}\n`;
      content += `Позиция: строка ${max.row + 1}, столбец ${max.col + 1}`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task1_matrix.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Grid3x3" className="text-primary" />
            Задача 1: Матрица MxN и максимальный элемент
          </CardTitle>
          <CardDescription>
            Генерация целочисленной матрицы случайными числами и поиск максимального элемента
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
            <Button onClick={generateMatrix} className="gap-2">
              <Icon name="Sparkles" size={18} />
              Сгенерировать матрицу
            </Button>
            {matrix.length > 0 && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить в файл
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {matrix.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {matrix.map((row, i) => (
                    <tr key={i}>
                      {row.map((val, j) => (
                        <td
                          key={j}
                          className={`border p-2 text-center font-mono font-semibold transition-all ${
                            max && i === max.row && j === max.col
                              ? 'bg-primary text-primary-foreground scale-110 shadow-lg'
                              : 'bg-card hover:bg-muted'
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {max && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="TrendingUp" className="text-primary" />
                  <span className="font-semibold">Максимальный элемент</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Значение:</span>
                    <p className="font-mono text-2xl font-bold text-primary">{max.value}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Строка:</span>
                    <p className="font-mono text-2xl font-bold">{max.row + 1}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Столбец:</span>
                    <p className="font-mono text-2xl font-bold">{max.col + 1}</p>
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
