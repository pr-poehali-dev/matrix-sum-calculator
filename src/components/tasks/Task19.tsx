import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task19() {
  const [text, setText] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSampleFile = () => {
    const sampleText = 'Beautiful birds build big buildings by the beach';
    const blob = new Blob([sampleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Файл-пример создан');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      analyzeText(content);
    };
    reader.readAsText(file);
  };

  const analyzeText = (inputText: string) => {
    if (!inputText.trim()) {
      toast.error('Введите текст');
      return;
    }

    const allWords = inputText.split(/\s+/).filter(w => w.length > 0);
    const bWords = allWords.filter(w => w.toLowerCase().startsWith('b'));
    
    setText(inputText);
    setWords(bWords);
    setCount(bWords.length);
    toast.success(`Найдено ${bWords.length} слов на букву B`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Type" className="text-primary" />
            Задача 19: Слова на букву B
          </CardTitle>
          <CardDescription>
            Поиск количества слов, начинающихся с буквы B в английском тексте
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
              Загрузить текст
            </Button>
            <input ref={fileInputRef} type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
          </div>

          <div>
            <Textarea
              placeholder="Или введите английский текст здесь..."
              rows={4}
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => analyzeText(text)} className="mt-2">
              Анализировать
            </Button>
          </div>
        </CardContent>
      </Card>

      {count > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат (Memo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Target" className="text-primary" size={24} />
                <span className="font-semibold text-lg">Слова на букву B</span>
              </div>
              <div className="text-6xl font-bold text-primary font-mono mb-4">{count}</div>
              <div className="text-sm text-muted-foreground">Найдено слов, начинающихся с 'B' или 'b'</div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Список слов:</div>
              <div className="flex gap-2 flex-wrap">
                {words.map((word, i) => (
                  <span key={i} className="px-3 py-1 bg-primary text-primary-foreground rounded font-mono font-semibold">
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <Textarea
              value={`Слова на B:\n${words.join('\n')}\n\nВсего: ${count}`}
              readOnly
              rows={Math.min(words.length + 3, 10)}
              className="font-mono"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
