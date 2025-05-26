---
layout: default
title: Excel
---
# Excel VBA tools
## 每行重複多次
```vba
Sub insertrows()
'Updateby Extendoffice
Dim I As Long
Dim xCount As Integer
LableNumber:
xCount = Application.InputBox("Number of Rows", "Kutools for Excel", , , , , , 1)
If xCount < 1 Then
MsgBox "the entered number of rows is error ,please enter again", vbInformation, "Kutools for Excel"
GoTo LableNumber
End If
For I = Range("A" & Rows.CountLarge).End(xlUp).Row To 2 Step -1
Rows(I).Copy
Rows(I).Resize(xCount).Insert
Next
Application.CutCopyMode = False
End Sub
```

## 多次復制一個特定行
```vba
Sub test()
'Updateby Extendoffice
    Dim xCount As Integer
LableNumber:
    xCount = Application.InputBox("Number of Rows", "Kutools for Excel", , , , , , 1)
    If xCount < 1 Then
        MsgBox "the entered number of rows is error, please enter again", vbInformation, "Kutools for Excel"
        GoTo LableNumber
    End If
    ActiveCell.EntireRow.Copy
    Range(ActiveCell.Offset(1, 0), ActiveCell.Offset(xCount, 0)).EntireRow.Insert Shift:=xlDown
    Application.CutCopyMode = False
End Sub
```