import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task16() {
  const [result, setResult] = useState('');
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSampleFile = () => {
    const content = `1\n-3\n2`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'equation.txt';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Файл-пример создан');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const numbers = text.split(/[\n,\s]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
      if (numbers.length >= 3) {
        solveEquation(numbers[0], numbers[1], numbers[2]);
      }
    };
    reader.readAsText(file);
  };

  const solveEquation = (a: number, b: number, c: number) => {
    setA(a);
    setB(b);
    setC(c);

    if (a === 0) {
      setResult('Это не квадратное уравнение (a = 0)');
      return;
    }

    const d = b * b - 4 * a * c;
    if (d < 0) {
      setResult('Нет действительных корней (D < 0)');
    } else if (d === 0) {
      const x = -b / (2 * a);
      setResult(`Один корень: x = ${x.toFixed(4)}`);
    } else {
      const x1 = (-b + Math.sqrt(d)) / (2 * a);
      const x2 = (-b - Math.sqrt(d)) / (2 * a);
      setResult(`Два корня:\nx₁ = ${x1.toFixed(4)}\nx₂ = ${x2.toFixed(4)}`);
    }
    toast.success('Уравнение решено');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Variable" className="text-primary" />
            Задача 16: Решение квадратного уравнения
          </CardTitle>
          <CardDescription>
            Решение уравнения ax² + bx + c = 0. Коэффициенты загружаются из файла
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={generateSampleFile} variant="outline" className="gap-2">
              <Icon name="FileDown" size={18} />
              Создать файл-пример
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Icon name="Upload" size={18} />
              Загрузить коэффициенты
            </Button>
            <input ref={fileInputRef} type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат (Label)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Уравнение:</div>
              <div className="text-2xl font-mono font-bold">
                {a}x² + {b}x + {c} = 0
              </div>
            </div>
            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-3xl font-bold text-primary whitespace-pre-line">{result}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
