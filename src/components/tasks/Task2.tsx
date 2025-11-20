import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task2() {
  const [arrayData, setArrayData] = useState<number[]>([]);
  const [stats, setStats] = useState<{ positive: number; negative: number; zero: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSampleFile = () => {
    const sampleArray = Array.from({ length: 12 }, () => Math.floor(Math.random() * 41) - 20);
    const content = sampleArray.join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'array_a12.txt';
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
        .slice(0, 12);

      if (numbers.length === 0) {
        toast.error('Файл не содержит чисел');
        return;
      }

      setArrayData(numbers);
      analyzeArray(numbers);
      toast.success(`Загружено ${numbers.length} чисел`);
    };
    reader.readAsText(file);
  };

  const analyzeArray = (arr: number[]) => {
    const positive = arr.filter(n => n > 0).length;
    const negative = arr.filter(n => n < 0).length;
    const zero = arr.filter(n => n === 0).length;
    
    setStats({ positive, negative, zero });
  };

  const manualInput = (text: string) => {
    const numbers = text
      .split(/[\n,\s]+/)
      .filter(s => s.trim())
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n))
      .slice(0, 12);

    if (numbers.length > 0) {
      setArrayData(numbers);
      analyzeArray(numbers);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileText" className="text-primary" />
            Задача 2: Анализ массива A(12)
          </CardTitle>
          <CardDescription>
            Чтение массива из файла и подсчет положительных, отрицательных и нулевых элементов
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

          <div>
            <label className="text-sm font-medium mb-2 block">
              Или введите числа вручную (до 12 чисел через пробел или строку):
            </label>
            <Textarea
              placeholder="-5 10 0 -3 7 0 15 -8 2 0 -1 9"
              className="font-mono"
              rows={4}
              onChange={(e) => manualInput(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {arrayData.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Массив A({arrayData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg font-mono text-sm mb-6 overflow-x-auto">
              <div className="flex gap-3 flex-wrap">
                {arrayData.map((num, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded ${
                      num > 0
                        ? 'bg-green-100 text-green-700'
                        : num < 0
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>

            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="TrendingUp" className="text-green-600" size={20} />
                    <span className="font-semibold text-green-900">Положительные</span>
                  </div>
                  <p className="text-3xl font-bold text-green-700 font-mono">{stats.positive}</p>
                  <p className="text-sm text-green-600 mt-1">
                    {((stats.positive / arrayData.length) * 100).toFixed(0)}% от массива
                  </p>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="TrendingDown" className="text-red-600" size={20} />
                    <span className="font-semibold text-red-900">Отрицательные</span>
                  </div>
                  <p className="text-3xl font-bold text-red-700 font-mono">{stats.negative}</p>
                  <p className="text-sm text-red-600 mt-1">
                    {((stats.negative / arrayData.length) * 100).toFixed(0)}% от массива
                  </p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Minus" className="text-gray-600" size={20} />
                    <span className="font-semibold text-gray-900">Нулевые</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-700 font-mono">{stats.zero}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {((stats.zero / arrayData.length) * 100).toFixed(0)}% от массива
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
