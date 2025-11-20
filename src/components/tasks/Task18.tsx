import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Task18() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [zeroIndexes, setZeroIndexes] = useState<number[]>([]);

  const generate = () => {
    const seq = Array.from({ length: 20 }, () => Math.floor(Math.random() * 11) - 2);
    const indexes = seq.map((val, i) => val === 0 ? i + 1 : null).filter(i => i !== null) as number[];
    setSequence(seq);
    setZeroIndexes(indexes);
    toast.success(`Найдено ${indexes.length} нулевых элементов`);
  };

  const saveToFile = () => {
    const content = `Задача 18: Номера нулевых элементов\n\nПоследовательность:\n${sequence.join(', ')}\n\nНомера нулевых элементов:\n${zeroIndexes.join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task18_zero_indexes.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Файл сохранен');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Target" className="text-primary" />
            Задача 18: Номера нулевых элементов
          </CardTitle>
          <CardDescription>
            Создание массива из порядковых номеров нулевых элементов последовательности
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={generate} className="gap-2">
              <Icon name="Shuffle" size={18} />
              Сгенерировать последовательность
            </Button>
            {sequence.length > 0 && (
              <Button onClick={saveToFile} variant="outline" className="gap-2">
                <Icon name="Download" size={18} />
                Сохранить
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {sequence.length > 0 && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Результат (Edit)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-3">Последовательность (20 элементов):</div>
              <div className="grid grid-cols-10 gap-2">
                {sequence.map((val, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{i + 1}</div>
                    <div className={`p-2 rounded font-mono font-bold ${
                      val === 0 ? 'bg-primary text-primary-foreground scale-110' : 'bg-background border'
                    }`}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-sm text-muted-foreground mb-3">Номера нулевых элементов:</div>
              {zeroIndexes.length > 0 ? (
                <>
                  <Input 
                    value={zeroIndexes.join(', ')}
                    readOnly
                    className="font-mono font-bold text-lg mb-4"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {zeroIndexes.map((idx, i) => (
                      <div key={i} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                        <div className="text-xs opacity-80">Позиция</div>
                        <div className="text-2xl font-bold font-mono">{idx}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground">Нулевых элементов не найдено</div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Всего элементов</div>
                <div className="text-2xl font-bold font-mono">20</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Нулевых</div>
                <div className="text-2xl font-bold font-mono text-primary">{zeroIndexes.length}</div>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Ненулевых</div>
                <div className="text-2xl font-bold font-mono">{20 - zeroIndexes.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
