import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task12() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSampleFile = () => {
    const sampleWord = 'УРА';
    const blob = new Blob([sampleWord], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Файл-пример создан');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string).trim();
      processWord(text);
    };
    reader.readAsText(file);
  };

  const processWord = (inputWord: string) => {
    if (!inputWord) {
      toast.error('Введите слово');
      return;
    }

    const exclamations = '!'.repeat(inputWord.length);
    const resultWord = inputWord + exclamations;
    
    setWord(inputWord);
    setResult(resultWord);
    toast.success('Слово обработано');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Text" className="text-primary" />
            Задача 12: Добавление восклицаний
          </CardTitle>
          <CardDescription>
            К слову добавляется столько восклицательных знаков, сколько в нем букв
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={generateSampleFile} variant="outline" className="gap-2">
              <Icon name="FileDown" size={18} />
              Создать файл-пример
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Icon name="Upload" size={18} />
              Загрузить из файла
            </Button>
            <input ref={fileInputRef} type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
          </div>

          <div>
            <Label htmlFor="word">Или введите слово вручную:</Label>
            <div className="flex gap-2">
              <Input
                id="word"
                placeholder="Введите слово..."
                className="font-mono"
                onKeyPress={(e) => e.key === 'Enter' && processWord((e.target as HTMLInputElement).value)}
              />
              <Button onClick={(e) => {
                const input = document.getElementById('word') as HTMLInputElement;
                processWord(input.value);
              }}>
                Обработать
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат (LabeledEdit)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-sm text-muted-foreground mb-2">Исходное слово:</div>
              <div className="text-4xl font-bold font-mono mb-6">{word}</div>

              <Icon name="ArrowDown" className="text-primary mx-auto block" size={32} />

              <div className="text-sm text-muted-foreground mb-2 mt-6">Результат:</div>
              <div className="text-5xl font-bold font-mono text-primary break-all">{result}</div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Букв в слове</div>
                <div className="text-3xl font-bold font-mono">{word.length}</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Восклицаний</div>
                <div className="text-3xl font-bold font-mono text-primary">{word.length}</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Всего символов</div>
                <div className="text-3xl font-bold font-mono">{result.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
