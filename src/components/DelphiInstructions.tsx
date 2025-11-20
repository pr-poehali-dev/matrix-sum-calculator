import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`${label} скопирован`);
};

const tasks = [
  { id: 1, title: 'Задача 1', description: 'Матрица MxN и максимум' },
  { id: 2, title: 'Задача 2', description: 'Анализ массива A(12)' },
  { id: 3, title: 'Задача 3', description: 'Сумма кратных К' },
  { id: 4, title: 'Задача 4', description: 'Возведение в степень' },
  { id: 5, title: 'Задача 5', description: 'Стоимость конфет' },
  { id: 6, title: 'Задача 6', description: 'Сумма массива Mas(2,4)' },
  { id: 7, title: 'Задача 7', description: 'Минимум матрицы' },
  { id: 8, title: 'Задача 8', description: 'Сумма ряда' },
  { id: 9, title: 'Задача 9', description: 'Четные элементы' },
  { id: 10, title: 'Задача 10', description: 'Удвоенная матрица' },
  { id: 11, title: 'Задача 11', description: 'Члены ряда' },
  { id: 12, title: 'Задача 12', description: 'Добавление восклицаний' },
  { id: 13, title: 'Задача 13', description: 'Анализ возраста' },
  { id: 14, title: 'Задача 14', description: 'Таблица Sin/Cos' },
  { id: 15, title: 'Задача 15', description: 'Вычисление 25 значений' },
  { id: 16, title: 'Задача 16', description: 'Решение уравнения' },
  { id: 17, title: 'Задача 17', description: 'Четные числа' },
  { id: 18, title: 'Задача 18', description: 'Номера нулевых' },
  { id: 19, title: 'Задача 19', description: 'Слова на B' },
  { id: 20, title: 'Задача 20', description: 'Сумма большего и меньшего' },
];

const CodeBlock = ({ code, label }: { code: string; label: string }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(code, label)}>
        <Icon name="Copy" size={16} />
      </Button>
    </div>
    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto font-mono whitespace-pre-wrap">
      {code}
    </pre>
  </div>
);

export default function DelphiInstructions() {
  const [selectedTask, setSelectedTask] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTaskContent = (taskId: number) => {
    switch (taskId) {
      case 1:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Ввод M (строк)
Edit2: TEdit;         // Ввод N (столбцов)
Button1: TButton;     // Кнопка "Генерировать"
Button2: TButton;     // Кнопка "Сохранить"
StringGrid1: TStringGrid;  // Отображение матрицы
Label1: TLabel;       // Вывод максимума`}
            />
            <CodeBlock
              label="Переменные"
              code={`var
  Matrix: array of array of Integer;
  M, N, i, j, MaxValue, MaxRow, MaxCol: Integer;
  F: TextFile;`}
            />
            <CodeBlock
              label="Генерация и поиск максимума"
              code={`procedure TForm1.Button1Click(Sender: TObject);
begin
  M := StrToInt(Edit1.Text);
  N := StrToInt(Edit2.Text);
  
  StringGrid1.RowCount := M;
  StringGrid1.ColCount := N;
  SetLength(Matrix, M, N);
  
  Randomize;
  MaxValue := -MaxInt;
  
  for i := 0 to M - 1 do
    for j := 0 to N - 1 do
    begin
      Matrix[i, j] := Random(100) - 50;
      StringGrid1.Cells[j, i] := IntToStr(Matrix[i, j]);
      
      if Matrix[i, j] > MaxValue then
      begin
        MaxValue := Matrix[i, j];
        MaxRow := i;
        MaxCol := j;
      end;
    end;
  
  Label1.Caption := Format('Максимум: %d (строка %d, столбец %d)', 
    [MaxValue, MaxRow + 1, MaxCol + 1]);
end;`}
            />
            <CodeBlock
              label="Сохранение в файл"
              code={`procedure TForm1.Button2Click(Sender: TObject);
begin
  AssignFile(F, 'matrix.txt');
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
  WriteLn(F, 'Позиция: строка ', MaxRow + 1, ', столбец ', MaxCol + 1);
  
  CloseFile(F);
  ShowMessage('Файл сохранен');
end;`}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Загрузить"
RichEdit1: TRichEdit; // Вывод массива и результатов
OpenDialog1: TOpenDialog;`}
            />
            <CodeBlock
              label="Переменные"
              code={`var
  A: array[1..12] of Integer;
  F: TextFile;
  i, Positive, Negative, Zero: Integer;`}
            />
            <CodeBlock
              label="Чтение и анализ"
              code={`procedure TForm1.Button1Click(Sender: TObject);
begin
  if OpenDialog1.Execute then
  begin
    AssignFile(F, OpenDialog1.FileName);
    Reset(F);
    
    RichEdit1.Clear;
    RichEdit1.Lines.Add('Массив A(12):');
    
    for i := 1 to 12 do
    begin
      ReadLn(F, A[i]);
      RichEdit1.Lines.Add(IntToStr(A[i]));
    end;
    CloseFile(F);
    
    Positive := 0;
    Negative := 0;
    Zero := 0;
    
    for i := 1 to 12 do
    begin
      if A[i] > 0 then Inc(Positive)
      else if A[i] < 0 then Inc(Negative)
      else Inc(Zero);
    end;
    
    RichEdit1.Lines.Add('');
    RichEdit1.Lines.Add('Результаты анализа:');
    RichEdit1.Lines.Add('Положительных: ' + IntToStr(Positive));
    RichEdit1.Lines.Add('Отрицательных: ' + IntToStr(Negative));
    RichEdit1.Lines.Add('Нулевых: ' + IntToStr(Zero));
  end;
end;`}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Ввод N (кол-во чисел)
Edit2: TEdit;         // Ввод K (делитель)
Button1: TButton;     // Кнопка "Генерировать"
Button2: TButton;     // Кнопка "Вычислить"
ListBox1: TListBox;   // Список чисел`}
            />
            <CodeBlock
              label="Переменные"
              code={`var
  Numbers: array of Integer;
  N, K, i, Sum: Integer;
  F: TextFile;`}
            />
            <CodeBlock
              label="Генерация и вычисление"
              code={`procedure TForm1.Button1Click(Sender: TObject);
begin
  N := StrToInt(Edit1.Text);
  SetLength(Numbers, N);
  
  ListBox1.Clear;
  Randomize;
  
  for i := 0 to N - 1 do
  begin
    Numbers[i] := Random(100) + 1;
    ListBox1.Items.Add(IntToStr(Numbers[i]));
  end;
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
  K := StrToInt(Edit2.Text);
  Sum := 0;
  
  for i := 0 to N - 1 do
    if Numbers[i] mod K = 0 then
      Sum := Sum + Numbers[i];
  
  AssignFile(F, 'sum_result.txt');
  Rewrite(F);
  WriteLn(F, 'Сумма элементов кратных ', K, ': ', Sum);
  CloseFile(F);
  
  ShowMessage('Сумма: ' + IntToStr(Sum) + #13#10 + 'Файл сохранен');
end;`}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`LabeledEdit1: TLabeledEdit; // Число 1
LabeledEdit2: TLabeledEdit; // Число 2
LabeledEdit3: TLabeledEdit; // Число 3
Button1: TButton;            // Кнопка "Вычислить"
Label1: TLabel;              // Результаты`}
            />
            <CodeBlock
              label="Переменные и вычисление"
              code={`var
  Num1, Num2, Num3: Real;
  Res1, Res2, Res3: Real;
  PosCount, NegCount: Integer;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Num1 := StrToFloat(LabeledEdit1.Text);
  Num2 := StrToFloat(LabeledEdit2.Text);
  Num3 := StrToFloat(LabeledEdit3.Text);
  
  PosCount := 0;
  NegCount := 0;
  
  if Num1 >= 0 then
  begin
    Res1 := Num1 * Num1;
    Inc(PosCount);
  end
  else
  begin
    Res1 := Num1 * Num1 * Num1 * Num1;
    Inc(NegCount);
  end;
  
  if Num2 >= 0 then
  begin
    Res2 := Num2 * Num2;
    Inc(PosCount);
  end
  else
  begin
    Res2 := Num2 * Num2 * Num2 * Num2;
    Inc(NegCount);
  end;
  
  if Num3 >= 0 then
  begin
    Res3 := Num3 * Num3;
    Inc(PosCount);
  end
  else
  begin
    Res3 := Num3 * Num3 * Num3 * Num3;
    Inc(NegCount);
  end;
  
  Label1.Caption := Format('Результаты:%s%.2f, %.2f, %.2f%sПоложительных: %d%sОтрицательных: %d',
    [#13#10, Res1, Res2, Res3, #13#10, PosCount, #13#10, NegCount]);
  
  AssignFile(F, 'task4_result.txt');
  Rewrite(F);
  WriteLn(F, 'Результаты: ', Res1:0:2, ', ', Res2:0:2, ', ', Res3:0:2);
  WriteLn(F, 'Положительных: ', PosCount);
  WriteLn(F, 'Отрицательных: ', NegCount);
  CloseFile(F);
end;`}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Цена за 1 кг
Button1: TButton;     // Кнопка "Рассчитать"
Button2: TButton;     // Кнопка "Сохранить"
ListBox1: TListBox;   // Таблица цен`}
            />
            <CodeBlock
              label="Переменные и расчет"
              code={`var
  Price: Real;
  i: Integer;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Price := StrToFloat(Edit1.Text);
  
  ListBox1.Clear;
  ListBox1.Items.Add('Вес (кг)  |  Стоимость (руб.)');
  ListBox1.Items.Add('------------------------------');
  
  for i := 1 to 10 do
    ListBox1.Items.Add(Format('%3d кг    |    %.2f', [i, i * Price]));
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
  AssignFile(F, 'candy_prices.txt');
  Rewrite(F);
  
  WriteLn(F, 'Цена за 1 кг: ', Price:0:2, ' руб.');
  WriteLn(F);
  WriteLn(F, 'Вес (кг)    Стоимость (руб.)');
  WriteLn(F, '-----------------------------');
  
  for i := 1 to 10 do
    WriteLn(F, Format('%3d         %.2f', [i, i * Price]));
  
  CloseFile(F);
  ShowMessage('Файл сохранен');
end;`}
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Загрузить и вычислить"
StringGrid1: TStringGrid; // Отображение матрицы
Label1: TLabel;       // Сумма и среднее
OpenDialog1: TOpenDialog;`}
            />
            <CodeBlock
              label="Переменные и вычисление"
              code={`var
  Mas: array[1..2, 1..4] of Integer;
  F: TextFile;
  i, j, Sum: Integer;
  Avg: Real;

procedure TForm1.Button1Click(Sender: TObject);
begin
  if OpenDialog1.Execute then
  begin
    AssignFile(F, OpenDialog1.FileName);
    Reset(F);
    
    StringGrid1.RowCount := 2;
    StringGrid1.ColCount := 4;
    Sum := 0;
    
    for i := 1 to 2 do
      for j := 1 to 4 do
      begin
        ReadLn(F, Mas[i, j]);
        StringGrid1.Cells[j - 1, i - 1] := IntToStr(Mas[i, j]);
        Sum := Sum + Mas[i, j];
      end;
    
    CloseFile(F);
    
    Avg := Sum / 8;
    Label1.Caption := Format('Сумма: %d%sСреднее: %.2f', [Sum, #13#10, Avg]);
  end;
end;`}
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Ввод M
Edit2: TEdit;         // Ввод N
Button1: TButton;     // Кнопка "Генерировать и сохранить"
Label1: TLabel;       // Минимум`}
            />
            <CodeBlock
              label="Переменные и генерация"
              code={`var
  Matrix: array of array of Integer;
  M, N, i, j, MinValue, MinRow, MinCol: Integer;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  M := StrToInt(Edit1.Text);
  N := StrToInt(Edit2.Text);
  
  SetLength(Matrix, M, N);
  Randomize;
  MinValue := MaxInt;
  
  for i := 0 to M - 1 do
    for j := 0 to N - 1 do
    begin
      Matrix[i, j] := Random(51);
      
      if Matrix[i, j] < MinValue then
      begin
        MinValue := Matrix[i, j];
        MinRow := i;
        MinCol := j;
      end;
    end;
  
  Label1.Caption := Format('Минимум: %d (строка %d, столбец %d)',
    [MinValue, MinRow + 1, MinCol + 1]);
  
  AssignFile(F, 'matrix_min.txt');
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
  WriteLn(F, 'Минимум: ', MinValue);
  WriteLn(F, 'Позиция: строка ', MinRow + 1, ', столбец ', MinCol + 1);
  CloseFile(F);
  
  ShowMessage('Файл сохранен');
end;`}
            />
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Ввод N
Button1: TButton;     // Кнопка "Вычислить"
RichEdit1: TRichEdit; // Вывод результата`}
            />
            <CodeBlock
              label="Вычисление суммы 1 + 1/2 + 1/3 + ... + 1/N"
              code={`var
  N, i: Integer;
  Sum: Real;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  N := StrToInt(Edit1.Text);
  Sum := 0;
  
  RichEdit1.Clear;
  RichEdit1.Lines.Add('Сумма ряда 1 + 1/2 + 1/3 + ... + 1/' + IntToStr(N));
  RichEdit1.Lines.Add('');
  
  for i := 1 to N do
  begin
    Sum := Sum + 1 / i;
    RichEdit1.Lines.Add(Format('1/%d = %.6f, Сумма = %.6f', [i, 1/i, Sum]));
  end;
  
  RichEdit1.Lines.Add('');
  RichEdit1.Lines.Add(Format('Итоговая сумма: %.6f', [Sum]));
  
  AssignFile(F, 'sum_series.txt');
  Rewrite(F);
  WriteLn(F, 'N = ', N);
  WriteLn(F, 'Сумма = ', Sum:0:6);
  CloseFile(F);
end;`}
            />
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Загрузить и анализировать"
LabeledEdit1: TLabeledEdit; // Результат
OpenDialog1: TOpenDialog;`}
            />
            <CodeBlock
              label="Поиск четных элементов"
              code={`var
  M: array of Integer;
  F: TextFile;
  N, i, Count: Integer;
  Result: string;

procedure TForm1.Button1Click(Sender: TObject);
begin
  if OpenDialog1.Execute then
  begin
    AssignFile(F, OpenDialog1.FileName);
    Reset(F);
    
    N := 0;
    while not Eof(F) do
    begin
      SetLength(M, N + 1);
      ReadLn(F, M[N]);
      Inc(N);
    end;
    CloseFile(F);
    
    Count := 0;
    Result := 'Четные элементы:' + #13#10;
    
    for i := 0 to N - 1 do
      if M[i] mod 2 = 0 then
      begin
        Inc(Count);
        Result := Result + Format('Позиция %d: %d', [i + 1, M[i]]) + #13#10;
      end;
    
    Result := Result + #13#10 + 'Всего: ' + IntToStr(Count);
    LabeledEdit1.Text := Result;
  end;
end;`}
            />
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Ввод M
Edit2: TEdit;         // Ввод N
Button1: TButton;     // Кнопка "Генерировать"
StringGrid1: TStringGrid; // Исходная матрица`}
            />
            <CodeBlock
              label="Удвоение матрицы"
              code={`var
  Mas, DoubleMas: array of array of Integer;
  M, N, i, j: Integer;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  M := StrToInt(Edit1.Text);
  N := StrToInt(Edit2.Text);
  
  SetLength(Mas, M, N);
  SetLength(DoubleMas, M, N);
  
  StringGrid1.RowCount := M;
  StringGrid1.ColCount := N;
  
  Randomize;
  for i := 0 to M - 1 do
    for j := 0 to N - 1 do
    begin
      Mas[i, j] := Random(21);
      DoubleMas[i, j] := Mas[i, j] * 2;
      StringGrid1.Cells[j, i] := IntToStr(Mas[i, j]);
    end;
  
  AssignFile(F, 'double_matrix.txt');
  Rewrite(F);
  WriteLn(F, 'Удвоенная матрица ', M, 'x', N);
  WriteLn(F);
  
  for i := 0 to M - 1 do
  begin
    for j := 0 to N - 1 do
      Write(F, DoubleMas[i, j]:5);
    WriteLn(F);
  end;
  
  CloseFile(F);
  ShowMessage('Файл сохранен');
end;`}
            />
          </div>
        );

      case 11:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Начальное значение
Edit2: TEdit;         // Конечное значение
Edit3: TEdit;         // Шаг
Button1: TButton;     // Кнопка "Вычислить"
RichEdit1: TRichEdit; // Члены ряда`}
            />
            <CodeBlock
              label="Вычисление функции по ряду"
              code={`var
  StartVal, EndVal, Step, X, Result: Real;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  StartVal := StrToFloat(Edit1.Text);
  EndVal := StrToFloat(Edit2.Text);
  Step := StrToFloat(Edit3.Text);
  
  RichEdit1.Clear;
  RichEdit1.Lines.Add('X         |  Результат');
  RichEdit1.Lines.Add('------------------------');
  
  AssignFile(F, 'series_values.txt');
  Rewrite(F);
  
  X := StartVal;
  while X <= EndVal do
  begin
    Result := X * X + 2 * X + 1;
    RichEdit1.Lines.Add(Format('%.2f     |  %.4f', [X, Result]));
    WriteLn(F, X:0:2, '  ', Result:0:4);
    X := X + Step;
  end;
  
  CloseFile(F);
end;`}
            />
          </div>
        );

      case 12:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Загрузить"
LabeledEdit1: TLabeledEdit; // Результат
OpenDialog1: TOpenDialog;`}
            />
            <CodeBlock
              label="Добавление восклицаний"
              code={`var
  Word, Result: string;
  F: TextFile;
  i: Integer;

procedure TForm1.Button1Click(Sender: TObject);
begin
  if OpenDialog1.Execute then
  begin
    AssignFile(F, OpenDialog1.FileName);
    Reset(F);
    ReadLn(F, Word);
    CloseFile(F);
    
    Result := Word;
    for i := 1 to Length(Word) do
      Result := Result + '!';
    
    LabeledEdit1.Text := Result;
  end;
end;`}
            />
          </div>
        );

      case 13:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Генерировать возраст"
Edit1: TEdit;         // Результат`}
            />
            <CodeBlock
              label="Анализ возраста"
              code={`var
  Age: Integer;
  Category: string;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Randomize;
  Age := Random(80) + 1;
  
  if Age < 7 then
    Category := 'Дошкольник'
  else if Age < 18 then
    Category := 'Ученик'
  else if Age < 60 then
    Category := 'Работник'
  else
    Category := 'Пенсионер';
  
  Edit1.Text := Format('Возраст: %d лет - %s', [Age, Category]);
  
  AssignFile(F, 'age_analysis.txt');
  Rewrite(F);
  WriteLn(F, 'Возраст: ', Age);
  WriteLn(F, 'Категория: ', Category);
  CloseFile(F);
end;`}
            />
          </div>
        );

      case 14:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Вычислить"
Memo1: TMemo;         // Таблица значений`}
            />
            <CodeBlock
              label="Таблица Sin и Cos"
              code={`var
  X: Real;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Memo1.Clear;
  Memo1.Lines.Add('X        |  Sin(X)   |  Cos(X)');
  Memo1.Lines.Add('--------------------------------');
  
  AssignFile(F, 'sin_cos_table.txt');
  Rewrite(F);
  WriteLn(F, 'X        |  Sin(X)   |  Cos(X)');
  WriteLn(F, '--------------------------------');
  
  X := 0;
  while X <= 1 do
  begin
    Memo1.Lines.Add(Format('%.1f     |  %.4f    |  %.4f', [X, Sin(X), Cos(X)]));
    WriteLn(F, X:0:1, '  ', Sin(X):0:4, '  ', Cos(X):0:4);
    X := X + 0.1;
  end;
  
  CloseFile(F);
end;`}
            />
          </div>
        );

      case 15:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Вычислить"
Memo1: TMemo;         // Результаты`}
            />
            <CodeBlock
              label="25 значений функции"
              code={`var
  K: Integer;
  A, B, Result: Real;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Memo1.Clear;
  Memo1.Lines.Add('K  |  A     |  B     |  Результат');
  Memo1.Lines.Add('--------------------------------------');
  
  AssignFile(F, 'function_values.txt');
  Rewrite(F);
  
  Randomize;
  for K := 1 to 25 do
  begin
    A := Random * 10;
    B := Random * 10;
    Result := A * A + B * B;
    
    Memo1.Lines.Add(Format('%2d | %.2f | %.2f | %.2f', [K, A, B, Result]));
    WriteLn(F, K, '  ', A:0:2, '  ', B:0:2, '  ', Result:0:2);
  end;
  
  CloseFile(F);
end;`}
            />
          </div>
        );

      case 16:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Решить"
Label1: TLabel;       // Результат
OpenDialog1: TOpenDialog;`}
            />
            <CodeBlock
              label="Решение квадратного уравнения"
              code={`var
  A, B, C, D, X1, X2: Real;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  if OpenDialog1.Execute then
  begin
    AssignFile(F, OpenDialog1.FileName);
    Reset(F);
    ReadLn(F, A);
    ReadLn(F, B);
    ReadLn(F, C);
    CloseFile(F);
    
    if A = 0 then
    begin
      Label1.Caption := 'Это не квадратное уравнение';
      Exit;
    end;
    
    D := B * B - 4 * A * C;
    
    if D < 0 then
      Label1.Caption := 'Нет действительных корней'
    else if D = 0 then
    begin
      X1 := -B / (2 * A);
      Label1.Caption := Format('Один корень: X = %.2f', [X1]);
    end
    else
    begin
      X1 := (-B + Sqrt(D)) / (2 * A);
      X2 := (-B - Sqrt(D)) / (2 * A);
      Label1.Caption := Format('Два корня: X1 = %.2f, X2 = %.2f', [X1, X2]);
    end;
  end;
end;`}
            />
          </div>
        );

      case 17:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Ввод последовательности
Button1: TButton;     // Кнопка "Анализировать"
LabeledEdit1: TLabeledEdit; // Результат`}
            />
            <CodeBlock
              label="Поиск четных чисел"
              code={`var
  Input: string;
  Numbers, EvenNumbers: array of Integer;
  i, Num, EvenCount: Integer;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Input := Edit1.Text;
  SetLength(Numbers, 0);
  
  // Парсим числа
  while Pos(' ', Input) > 0 do
  begin
    Num := StrToInt(Copy(Input, 1, Pos(' ', Input) - 1));
    SetLength(Numbers, Length(Numbers) + 1);
    Numbers[High(Numbers)] := Num;
    Delete(Input, 1, Pos(' ', Input));
  end;
  
  if Input <> '' then
  begin
    SetLength(Numbers, Length(Numbers) + 1);
    Numbers[High(Numbers)] := StrToInt(Input);
  end;
  
  // Ищем четные
  SetLength(EvenNumbers, 0);
  for i := 0 to High(Numbers) do
    if Numbers[i] mod 2 = 0 then
    begin
      SetLength(EvenNumbers, Length(EvenNumbers) + 1);
      EvenNumbers[High(EvenNumbers)] := Numbers[i];
    end;
  
  if Length(EvenNumbers) = 0 then
    LabeledEdit1.Text := 'Четных чисел нет'
  else
  begin
    Input := 'Четные числа: ';
    for i := 0 to High(EvenNumbers) do
      Input := Input + IntToStr(EvenNumbers[i]) + ' ';
    LabeledEdit1.Text := Input;
    
    AssignFile(F, 'even_numbers.txt');
    Rewrite(F);
    for i := 0 to High(EvenNumbers) do
      WriteLn(F, EvenNumbers[i]);
    CloseFile(F);
  end;
end;`}
            />
          </div>
        );

      case 18:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Генерировать"
Edit1: TEdit;         // Результат (номера нулевых)`}
            />
            <CodeBlock
              label="Поиск нулевых элементов"
              code={`var
  Seq: array of Integer;
  ZeroIndexes: array of Integer;
  N, i, ZeroCount: Integer;
  Result: string;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  N := 20;
  SetLength(Seq, N);
  SetLength(ZeroIndexes, 0);
  
  Randomize;
  for i := 0 to N - 1 do
  begin
    Seq[i] := Random(11) - 2;
    if Seq[i] = 0 then
    begin
      SetLength(ZeroIndexes, Length(ZeroIndexes) + 1);
      ZeroIndexes[High(ZeroIndexes)] := i + 1;
    end;
  end;
  
  Result := 'Номера нулевых элементов: ';
  for i := 0 to High(ZeroIndexes) do
    Result := Result + IntToStr(ZeroIndexes[i]) + ' ';
  
  Edit1.Text := Result;
  
  AssignFile(F, 'zero_indexes.txt');
  Rewrite(F);
  for i := 0 to High(ZeroIndexes) do
    WriteLn(F, ZeroIndexes[i]);
  CloseFile(F);
end;`}
            />
          </div>
        );

      case 19:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Button1: TButton;     // Кнопка "Загрузить"
Memo1: TMemo;         // Результат
OpenDialog1: TOpenDialog;`}
            />
            <CodeBlock
              label="Подсчет слов на букву B"
              code={`var
  Text: string;
  Words: TStringList;
  F: TextFile;
  i, Count: Integer;

procedure TForm1.Button1Click(Sender: TObject);
begin
  if OpenDialog1.Execute then
  begin
    AssignFile(F, OpenDialog1.FileName);
    Reset(F);
    ReadLn(F, Text);
    CloseFile(F);
    
    Words := TStringList.Create;
    try
      Words.Delimiter := ' ';
      Words.DelimitedText := Text;
      
      Count := 0;
      Memo1.Clear;
      Memo1.Lines.Add('Слова на букву B:');
      
      for i := 0 to Words.Count - 1 do
        if (Length(Words[i]) > 0) and 
           ((Words[i][1] = 'B') or (Words[i][1] = 'b')) then
        begin
          Inc(Count);
          Memo1.Lines.Add(Words[i]);
        end;
      
      Memo1.Lines.Add('');
      Memo1.Lines.Add('Всего слов: ' + IntToStr(Count));
    finally
      Words.Free;
    end;
  end;
end;`}
            />
          </div>
        );

      case 20:
        return (
          <div className="space-y-4">
            <CodeBlock
              label="Компоненты формы"
              code={`Edit1: TEdit;         // Число 1
Edit2: TEdit;         // Число 2
Edit3: TEdit;         // Число 3
Button1: TButton;     // Кнопка "Вычислить"
Label1: TLabel;       // Результат`}
            />
            <CodeBlock
              label="Сумма большего и меньшего"
              code={`var
  Num1, Num2, Num3, Min, Max, Sum: Real;
  F: TextFile;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Num1 := StrToFloat(Edit1.Text);
  Num2 := StrToFloat(Edit2.Text);
  Num3 := StrToFloat(Edit3.Text);
  
  Max := Num1;
  Min := Num1;
  
  if Num2 > Max then Max := Num2;
  if Num3 > Max then Max := Num3;
  
  if Num2 < Min then Min := Num2;
  if Num3 < Min then Min := Num3;
  
  Sum := Max + Min;
  
  Label1.Caption := Format('Максимум: %.2f%sМинимум: %.2f%sСумма: %.2f',
    [Max, #13#10, Min, #13#10, Sum]);
  
  AssignFile(F, 'sum_max_min.txt');
  Rewrite(F);
  WriteLn(F, 'Максимум: ', Max:0:2);
  WriteLn(F, 'Минимум: ', Min:0:2);
  WriteLn(F, 'Сумма: ', Sum:0:2);
  CloseFile(F);
end;`}
            />
          </div>
        );

      default:
        return <div>Выберите задачу</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Code" className="text-primary" />
            Инструкции для Delphi - Все 20 задач
          </CardTitle>
          <CardDescription>
            Готовые решения с компонентами формы и полным кодом
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Поиск задачи..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <ScrollArea className="h-[600px] rounded-lg border p-4">
              <div className="space-y-2">
                {filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTask === task.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedTask(task.id)}
                  >
                    <CardHeader className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-mono text-sm font-bold">
                          {task.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{task.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {task.description}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="lg:col-span-3">
              <ScrollArea className="h-[600px]">
                <div className="pr-4">{getTaskContent(selectedTask)}</div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Icon name="Info" className="text-primary" size={20} />
            Общие рекомендации по Delphi
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
              <span>Настройте размеры StringGrid перед заполнением (RowCount, ColCount)</span>
            </div>
            <div className="flex gap-2">
              <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
              <span>Используйте try-except для обработки ошибок чтения файлов</span>
            </div>
            <div className="flex gap-2">
              <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
              <span>Вызывайте Randomize один раз в FormCreate для генерации случайных чисел</span>
            </div>
            <div className="flex gap-2">
              <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
              <span>Проверяйте корректность ввода перед преобразованием строк в числа</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
              <span>Добавьте SaveDialog и OpenDialog для удобства выбора файлов</span>
            </div>
            <div className="flex gap-2">
              <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
              <span>Используйте Format для форматирования строк с числами</span>
            </div>
            <div className="flex gap-2">
              <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
              <span>Всегда закрывайте файлы после работы (CloseFile)</span>
            </div>
            <div className="flex gap-2">
              <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
              <span>Используйте SetLength для динамических массивов</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
