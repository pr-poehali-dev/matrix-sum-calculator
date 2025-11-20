import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`${label} скопирован`);
};

export default function DelphiInstructions() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
          <Icon name="Code" className="text-primary" />
          Инструкции для Delphi
        </CardTitle>
        <CardDescription>
          Готовые фрагменты кода для реализации задач в Delphi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="task1" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="task1">Задача 1</TabsTrigger>
            <TabsTrigger value="task2">Задача 2</TabsTrigger>
            <TabsTrigger value="task5">Задача 5</TabsTrigger>
          </TabsList>

          <TabsContent value="task1" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Icon name="Grid3x3" size={18} />
                Задача 1: Матрица MxN и максимум
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Объявление переменных</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`var
  Matrix: array of array of Integer;
  M, N, i, j, MaxValue, MaxRow, MaxCol: Integer;
  F: TextFile;`, 'Код переменных')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`var
  Matrix: array of array of Integer;
  M, N, i, j, MaxValue, MaxRow, MaxCol: Integer;
  F: TextFile;`}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Генерация матрицы и поиск максимума</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`// Получаем размеры матрицы
M := StrToInt(Edit1.Text);
N := StrToInt(Edit2.Text);

// Создаем матрицу
SetLength(Matrix, M, N);

// Заполняем случайными числами
Randomize;
MaxValue := -MaxInt;
for i := 0 to M - 1 do
begin
  for j := 0 to N - 1 do
  begin
    Matrix[i, j] := Random(100) - 50; // от -50 до 49
    
    // Ищем максимум
    if Matrix[i, j] > MaxValue then
    begin
      MaxValue := Matrix[i, j];
      MaxRow := i;
      MaxCol := j;
    end;
    
    // Выводим в StringGrid
    StringGrid1.Cells[j, i] := IntToStr(Matrix[i, j]);
  end;
end;

// Выводим максимум
Label1.Caption := 'Максимум: ' + IntToStr(MaxValue) + 
                  ' (строка ' + IntToStr(MaxRow + 1) + 
                  ', столбец ' + IntToStr(MaxCol + 1) + ')';`, 'Код генерации')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`// Получаем размеры матрицы
M := StrToInt(Edit1.Text);
N := StrToInt(Edit2.Text);

// Создаем матрицу
SetLength(Matrix, M, N);

// Заполняем случайными числами
Randomize;
MaxValue := -MaxInt;
for i := 0 to M - 1 do
begin
  for j := 0 to N - 1 do
  begin
    Matrix[i, j] := Random(100) - 50;
    
    // Ищем максимум
    if Matrix[i, j] > MaxValue then
    begin
      MaxValue := Matrix[i, j];
      MaxRow := i;
      MaxCol := j;
    end;
    
    // Выводим в StringGrid
    StringGrid1.Cells[j, i] := IntToStr(Matrix[i, j]);
  end;
end;

// Выводим максимум
Label1.Caption := 'Максимум: ' + IntToStr(MaxValue);`}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Сохранение в файл</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`AssignFile(F, 'matrix.txt');
Rewrite(F);

WriteLn(F, 'Матрица ', M, 'x', N);
WriteLn(F);

for i := 0 to M - 1 do
begin
  for j := 0 to N - 1 do
    Write(F, Matrix[i, j]:5);
  WriteLn(F);
end;

WriteLn(F);
WriteLn(F, 'Максимальный элемент: ', MaxValue);
WriteLn(F, 'Позиция: строка ', MaxRow + 1, ', столбец ', MaxCol + 1);

CloseFile(F);
ShowMessage('Файл сохранен');`, 'Код сохранения')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`AssignFile(F, 'matrix.txt');
Rewrite(F);

WriteLn(F, 'Матрица ', M, 'x', N);
WriteLn(F);

for i := 0 to M - 1 do
begin
  for j := 0 to N - 1 do
    Write(F, Matrix[i, j]:5);
  WriteLn(F);
end;

WriteLn(F);
WriteLn(F, 'Максимум: ', MaxValue);

CloseFile(F);`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="task2" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Icon name="FileText" size={18} />
                Задача 2: Анализ массива A(12)
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Объявление переменных</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`var
  A: array[1..12] of Integer;
  F: TextFile;
  i, Positive, Negative, Zero: Integer;`, 'Код переменных')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`var
  A: array[1..12] of Integer;
  F: TextFile;
  i, Positive, Negative, Zero: Integer;`}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Чтение из файла</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`AssignFile(F, 'array.txt');
Reset(F);

for i := 1 to 12 do
begin
  ReadLn(F, A[i]);
  RichEdit1.Lines.Add(IntToStr(A[i]));
end;

CloseFile(F);`, 'Код чтения')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`AssignFile(F, 'array.txt');
Reset(F);

for i := 1 to 12 do
begin
  ReadLn(F, A[i]);
  RichEdit1.Lines.Add(IntToStr(A[i]));
end;

CloseFile(F);`}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Анализ элементов</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`Positive := 0;
Negative := 0;
Zero := 0;

for i := 1 to 12 do
begin
  if A[i] > 0 then
    Inc(Positive)
  else if A[i] < 0 then
    Inc(Negative)
  else
    Inc(Zero);
end;

RichEdit1.Lines.Add('');
RichEdit1.Lines.Add('Положительных: ' + IntToStr(Positive));
RichEdit1.Lines.Add('Отрицательных: ' + IntToStr(Negative));
RichEdit1.Lines.Add('Нулевых: ' + IntToStr(Zero));`, 'Код анализа')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`Positive := 0;
Negative := 0;
Zero := 0;

for i := 1 to 12 do
begin
  if A[i] > 0 then
    Inc(Positive)
  else if A[i] < 0 then
    Inc(Negative)
  else
    Inc(Zero);
end;

RichEdit1.Lines.Add('Положительных: ' + IntToStr(Positive));
RichEdit1.Lines.Add('Отрицательных: ' + IntToStr(Negative));
RichEdit1.Lines.Add('Нулевых: ' + IntToStr(Zero));`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="task5" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Icon name="Candy" size={18} />
                Задача 5: Стоимость конфет
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Объявление переменных</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`var
  Price: Real;
  i: Integer;
  F: TextFile;`, 'Код переменных')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`var
  Price: Real;
  i: Integer;
  F: TextFile;`}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Расчет и вывод в ListBox</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`Price := StrToFloat(Edit1.Text);

ListBox1.Clear;
ListBox1.Items.Add('Вес (кг)  |  Стоимость (руб.)');
ListBox1.Items.Add('----------------------------');

for i := 1 to 10 do
begin
  ListBox1.Items.Add(Format('%3d кг    |    %.2f', [i, i * Price]));
end;`, 'Код расчета')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`Price := StrToFloat(Edit1.Text);

ListBox1.Clear;
ListBox1.Items.Add('Вес (кг)  |  Стоимость (руб.)');
ListBox1.Items.Add('----------------------------');

for i := 1 to 10 do
begin
  ListBox1.Items.Add(Format('%3d кг | %.2f', 
    [i, i * Price]));
end;`}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Сохранение в файл</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(`AssignFile(F, 'candy_prices.txt');
Rewrite(F);

WriteLn(F, 'Цена за 1 кг: ', Price:0:2, ' руб.');
WriteLn(F);
WriteLn(F, 'Вес (кг)    Стоимость (руб.)');
WriteLn(F, '-----------------------------');

for i := 1 to 10 do
begin
  WriteLn(F, Format('%3d         %.2f', [i, i * Price]));
end;

CloseFile(F);
ShowMessage('Файл сохранен');`, 'Код сохранения')}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono">
{`AssignFile(F, 'candy_prices.txt');
Rewrite(F);

WriteLn(F, 'Цена за 1 кг: ', Price:0:2);
WriteLn(F);

for i := 1 to 10 do
begin
  WriteLn(F, Format('%3d | %.2f', 
    [i, i * Price]));
end;

CloseFile(F);`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>

    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Icon name="Info" className="text-primary" size={20} />
          Общие рекомендации
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex gap-2">
          <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
          <span>Настройте StringGrid: установите RowCount и ColCount перед заполнением</span>
        </div>
        <div className="flex gap-2">
          <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
          <span>Используйте try-except для обработки ошибок при чтении файлов</span>
        </div>
        <div className="flex gap-2">
          <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
          <span>Добавьте SaveDialog и OpenDialog для выбора файлов пользователем</span>
        </div>
        <div className="flex gap-2">
          <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
          <span>Проверяйте корректность ввода данных перед вычислениями</span>
        </div>
      </CardContent>
    </Card>
  </div>
  );
}
