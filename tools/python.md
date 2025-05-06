---
layout: default
title: Python
---
# Fiona
- Deal with large size geo files
- Fiona streams simple feature data to and from GIS formats like GeoPackage and Shapefile.
- [Fiona website](https://fiona.readthedocs.io/en/stable/README.html)

# python

## How variables handle mutable objects (like `lists`, `dicts`, and `DataFrames`) in Python

### Question 1
- python 函數中的變數為何也會更改到原始變數?在以下例子中，gdf被新增了面積及面積區間欄位。

```python
def calculate_area(geom):
    return abs(geod.geometry_area_perimeter(geom)[0])

def area_interval_gcs(gdf):
    # 計算每個 geometry 的面積，結果是平方米
    gdf['area_m2'] = gdf['geometry'].apply(calculate_area)
    # 定義區間
    bins = [0, 25, 50, 100, 150, 200, 250, float('inf')]
    labels = ['0-25 m²',  '25-50 m²', '50-100 m²', '100-150 m²', '150-200 m²', '200-250 m²', '>250 m²']
    # 將面積劃分到不同區間
    gdf['area_interval'] = pd.cut(gdf['area_m2'], bins=bins, labels=labels, include_lowest=True)
    # 統計每個區間的幾何數量
    interval_counts = gdf['area_interval'].value_counts().sort_index()
    # 計算每個區間所佔的百分比
    interval_percentage = (interval_counts / interval_counts.sum()) * 100
    # 將數量和百分比結合在一起
    result = pd.DataFrame({
        'Count': interval_counts,
        'Percentage': interval_percentage
    })
    # 顯示統計結果
    return result, gdf
interval_stats, gdf_update = area_interval_gcs(gdf)
print(interval_stats)
```

### Answer 1
In Python, understanding how variables handle mutable objects (like `lists`, `dicts`, and `DataFrames`) is key to understanding how changes propagate. Here’s a more in-depth explanation:

#### 1. **Variable Assignment and References**
In Python, when you assign a variable to a mutable object (such as a `list`, `dict`, or `DataFrame`), the variable doesn't hold the actual object itself, but rather a **reference** to the object. This means that multiple variables can reference the same object in memory.

##### Example:


```python
a = [1, 2, 3]  # List is mutable
b = a  # b now references the same list object as a

b.append(4)  # Modify the list through b

print(a)  # Output: [1, 2, 3, 4]
```


In this example, modifying `b` also modifies `a` because they both refer to the **same list in memory**.

#### 2. **Mutable vs. Immutable Objects**
- **Mutable objects**: These can be changed after they are created. Examples include `list`, `dict`, `set`, `DataFrame`, `GeoDataFrame`, etc.
- **Immutable objects**: These cannot be changed after creation. Examples include `int`, `float`, `tuple`, `str`, etc.

For **immutable** objects like strings, if you attempt to modify the object, Python creates a new object rather than modifying the original one.

##### Example (Immutable Objects):
```python
x = 5  # Integer is immutable
y = x
y += 1  # y now references a new object (6), x remains unchanged

print(x)  # Output: 5
print(y)  # Output: 6
```

In this case, modifying `y` does not affect `x` because integers are immutable. A new object is created instead.

#### 3. **Passing Mutable Objects to Functions**
When you pass a mutable object (like a `GeoDataFrame`) to a function, the function receives a **reference** to the original object. This means that changes made to the object within the function affect the original object outside the function unless you explicitly create a copy of it.

##### Example (Passing a Mutable Object):
```python
def modify_list(my_list):
    my_list.append(4)  # Modify the list in place

lst = [1, 2, 3]
modify_list(lst)

print(lst)  # Output: [1, 2, 3, 4]
```
Here, `lst` is modified within the `modify_list` function because the list is mutable, and the function modifies the original object.

#### 4. **Creating Copies to Prevent Unintended Changes**
If you don’t want changes to propagate to the original object, you need to create a **copy**. For mutable objects like `DataFrame` or `GeoDataFrame`, you can use `.copy()` to create a shallow copy.

##### Example (Using `copy()`):
```python
import pandas as pd

df = pd.DataFrame({'A': [1, 2, 3]})
df_copy = df.copy()  # Create a copy of the DataFrame

df_copy['A'] = df_copy['A'] + 10  # Modify the copy

print(df)  # Original DataFrame remains unchanged
# Output: 
#    A
# 0  1
# 1  2
# 2  3

print(df_copy)  # The copy is changed
# Output: 
#     A
# 0  11
# 1  12
# 2  13
```

Without `.copy()`, both `df` and `df_copy` would point to the same object, and changes in one would affect the other.

#### 5. **Deep Copy vs. Shallow Copy**
- **Shallow copy** (`.copy()`): Creates a new object, but elements inside the object still reference the same objects. In case of complex data structures, like a `list` of `lists`, inner objects are not copied.
- **Deep copy** (`copy.deepcopy()`): Creates a completely new, independent copy of the entire structure, including any nested objects.

##### Example (Shallow Copy):
```python
import copy

a = [[1, 2], [3, 4]]
b = a.copy()  # Shallow copy

b[0].append(5)

print(a)  # Output: [[1, 2, 5], [3, 4]] - Inner list is modified
```

To avoid this, you can use a **deep copy**:
```python
b = copy.deepcopy(a)
```

#### 6. **GeoDataFrame Example (Copy vs. Reference)**
Consider the following GeoDataFrame example, where the original data is modified inside the function because of passing by reference:

```python
import geopandas as gpd

def modify_gdf(gdf):
    gdf['new_column'] = gdf['geometry'].area

gdf = gpd.read_file('example.geojson')
modify_gdf(gdf)

print(gdf.head())  # 'new_column' is now in the original GeoDataFrame
```

To prevent this, use `.copy()`:

```python
def modify_gdf(gdf):
    gdf = gdf.copy()  # Now changes are made only to this copy
    gdf['new_column'] = gdf['geometry'].area
    return gdf
```

#### Key Takeaways:
- **Mutable objects** (like `GeoDataFrame`, `DataFrame`, lists, etc.) are passed by reference, so changes inside a function affect the original object.
- To prevent modifying the original object, **make a copy** (`.copy()`).
- Immutable objects (like integers, strings) are passed by value, so they don't affect the original variable.

By keeping these behaviors in mind, you can control how your functions interact with mutable data and prevent unwanted side effects!

### Question 2
- why the last line `gdf_update = gdf_update[gdf_update['area_m2'] >= 100]` only change gdf_update but not gdf since you mentioned:
- In Python, when you assign a variable to a mutable object (such as a list, dict, or DataFrame), the variable doesn't hold the actual object itself, but rather a reference to the object.

```python
def calculate_area(geom):
    return abs(geod.geometry_area_perimeter(geom)[0])

def area_interval_gcs(gdf):
    # 計算每個 geometry 的面積，結果是平方米
    gdf['area_m2'] = gdf['geometry'].apply(calculate_area)
    # 定義區間
    bins = [0, 25, 50, 100, 150, 200, 250, float('inf')]
    labels = ['0-25 m²',  '25-50 m²', '50-100 m²', '100-150 m²', '150-200 m²', '200-250 m²', '>250 m²']
    # 將面積劃分到不同區間
    gdf['area_interval'] = pd.cut(gdf['area_m2'], bins=bins, labels=labels, include_lowest=True)
    # 統計每個區間的幾何數量
    interval_counts = gdf['area_interval'].value_counts().sort_index()
    # 計算每個區間所佔的百分比
    interval_percentage = (interval_counts / interval_counts.sum()) * 100
    # 將數量和百分比結合在一起
    result = pd.DataFrame({
        'Count': interval_counts,
        'Percentage': interval_percentage
    })
    # 顯示統計結果
    return result, gdf

interval_stats, gdf_update = area_interval_gcs(gdf)
print(interval_stats)

gdf_update = gdf_update[gdf_update['area_m2'] >= 100]
```

### Answer 2
Great question! Let's dive into why this line only changes `gdf_update` and not the original `gdf`:

```python
gdf_update = gdf_update[gdf_update['area_m2'] >= 100]
```

#### Key Concept: Variable Assignment Creates a New Reference

When you execute this line of code:

```python
gdf_update = gdf_update[gdf_update['area_m2'] >= 100]
```

You are **re-assigning** the `gdf_update` variable to a **new subset** of the original `gdf_update` DataFrame where the `area_m2` values are greater than or equal to 100.

Here’s what happens step by step:

1. **Initial Reference**:
   When you return `gdf_update` from the `area_interval_gcs` function, both `gdf` and `gdf_update` still refer to the same underlying object (the same GeoDataFrame) at this point.

2. **New DataFrame Creation**:
   When you run this line:
   ```python
   gdf_update = gdf_update[gdf_update['area_m2'] >= 100]
   ```
   A **new DataFrame** is created. It contains only the rows where `area_m2 >= 100`. This new DataFrame is assigned to the variable `gdf_update`.

3. **Variable Reassignment**:
   The variable `gdf_update` now holds a reference to this new filtered DataFrame. This assignment **does not modify** the original `gdf` GeoDataFrame because the assignment only affects `gdf_update`'s reference. 

4. **Original Object Unaffected**:
   Since `gdf` still points to the original GeoDataFrame, and `gdf_update` now points to a new object (the filtered DataFrame), any subsequent changes to `gdf_update` will not affect `gdf`.

In summary:
- `gdf_update = gdf_update[gdf_update['area_m2'] >= 100]` filters and reassigns `gdf_update` to a new, smaller DataFrame, but **does not affect** the original `gdf`.
- If you wanted to modify the original `gdf` object itself, you would need to assign the result directly to `gdf` like this:
  ```python
  gdf = gdf[gdf['area_m2'] >= 100]
  ```

#### Why Doesn’t `gdf` Change Automatically?
Because Python doesn’t automatically link a new assignment (like `gdf_update = ...`) to other variables that previously referred to the same object. After reassigning `gdf_update`, only `gdf_update` refers to the filtered DataFrame, while `gdf` remains as it was.

This distinction allows you to freely modify subsets of your data (as `gdf_update`) without impacting the original data (in `gdf`).
## steps to set up a system for processing multiple GeoJSON files using two separate Python files:
### 1. **Create `main_process.py`**
   - **Purpose**: Contains the core logic to process a single GeoJSON file.
   - **Function**: Define a function (e.g., `process_geojson(input_file, output_file)`) that takes the input GeoJSON file path and the output TSV file path as parameters.
   - **Content**: Include all necessary imports and the processing logic for reading the GeoJSON file, performing calculations, and saving the results as a TSV file.

### Example Structure of `main_process.py`
```python
import geopandas as gpd

def process_geojson(input_file, output_file):
    # Load the GeoJSON file
    gdf = gpd.read_file(input_file)
    
    # Perform processing (calculations, transformations, etc.)
    
    # Save the result to a TSV file
    gdf.to_csv(output_file, sep='\t', index=False)

# Optionally include a main block for testing
if __name__ == "__main__":
    process_geojson('example.geojson', 'output.tsv')
```

### 2. **Create `batch_processor.py`**
   - **Purpose**: Loops through all the GeoJSON files in a specified directory and calls the processing function from `main_process.py` for each file.
   - **Directory Setup**: Define input and output directories for the GeoJSON and processed files.
   - **File Loop**: Use `os.listdir()` to iterate through the files in the input directory, check for `.geojson` extensions, and call the processing function.

### Example Structure of `batch_processor.py`
```python
import os
from main_process import process_geojson  # Import the processing function

# Define directories
input_dir = '/path/to/your/geojson/files/'  # Directory with GeoJSON files
output_dir = '/path/to/save/processed/files/'  # Directory to save TSV files

# Create output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Process each GeoJSON file in the input directory
for file_name in os.listdir(input_dir):
    if file_name.endswith('.geojson'):
        input_file = os.path.join(input_dir, file_name)
        output_file = os.path.join(output_dir, file_name.replace('.geojson', '_processed.tsv'))
        
        # Call the process_geojson function
        process_geojson(input_file, output_file)

        print(f"Finished processing: {input_file}")
```

### Summary Steps
1. **Define processing logic in `main_process.py`**:
   - Write a function to process a single GeoJSON file.
   - Include the necessary logic to handle the GeoDataFrame and save it as a TSV file.

2. **Set up batch processing in `batch_processor.py`**:
   - Import the processing function.
   - Set up input and output directories.
   - Loop through the files, process each GeoJSON, and save the results.

3. **Run `batch_processor.py`**:
   - This script will process all GeoJSON files in the specified directory and save the results in the output directory. 

By organizing your code in this way, you can maintain a clean separation of concerns while making it easy to process multiple files efficiently.

# shpaely

## geometry.coords
The `geometry.coords` attribute provides direct access to the coordinate sequence of a Shapely geometry, such as a `LineString` or `Point`. It returns the actual points (as a list of `(x, y)` tuples) that define the geometry's shape.

For example:
- **`Point`**: The coordinates sequence is a single point (e.g., `[(x, y)]`).
- **`LineString`**: The sequence contains all points in the line path, giving the full set of points that the line passes through.
- **`Polygon`**: `geometry.coords` doesn’t directly apply to a `Polygon` because a polygon has boundaries with distinct exterior and possibly interior (holes) rings. To access the polygon’s coordinates, you’d typically use `geometry.exterior.coords` for the outer boundary and `geometry.interiors` for any inner holes.
- **`MultiPolygon`**: Each polygon within a `MultiPolygon` must be accessed individually, as it doesn’t directly support `coords`. You’d use `.geoms` to get each individual polygon, and then use `polygon.exterior.coords` on each of them.

In short, `geometry.coords` is used to get all points for simpler geometries, but for polygons, it’s often necessary to use `exterior.coords` or work with each part individually in multi-part geometries.

## geometry.geoms
- In Shapely, a MultiPolygon is accessed via its `.geoms` attribute, which provides an iterable of the individual Polygon components. 
- `geometry` -> `goemetry.geoms`
- reference: [shapely Geometry](https://shapely.readthedocs.io/en/2.0.3/geometry.html)

# python basic
Python基礎語法
for loop
sequences = [0, 1, 2, 3, 4, 5]
for i in sequences:
  print(i)

# output: 0 1 2 3 4 5
for i in range(10):
    print(i, end=" ")
    
print() #換行
for i in range(20, 2, -2):
    print(i, end=" ")

# output:
# 0 1 2 3 4 5 6 7 8 9
# 20 18 16 14 12 10 8 6 4
# Example with two arguments
for i in range(-1, 5):
    print(i, end=", ") # prints: -1, 0, 1, 2, 3, 4, 
list
In Python, list[-1] returns the last element of the list.

length of a list
my_list = [1, 2, 3, 4, 5]
print(len(my_list))

# Output:
# 5
Split String in List
string = 'geeksforgeeks'
lst = []

for letter in string:
 lst.append(letter)

print(lst)

# output: ['g', 'e', 'e', 'k', 's', 'f', 'o', 'r', 'g', 'e', 'e', 'k', 's']
Remove List Items
thislist = ["apple", "banana", "cherry"]
thislist.pop(1)
print(thislist)

# output: ['apple', 'cherry']
# https://www.w3schools.com/python/python_lists_remove.asp
Check if a list is empty or not
# Python code to check for empty list 
lis1 = [] 
if lis1==[]: 
    print("Empty List") 
else: 
    print("The list is not empty")
Python - Check if a list is empty or not - GeeksforGeeks
A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and…www.geeksforgeeks.org
list of object
# neecode:meeting schedule
"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""

class Solution:
    def canAttendMeetings(self, intervals: List[Interval]) -> bool:
        intervals.sort(key = lambda i : i.start)
        
        for i in range(len(intervals)):
            i1 = interval[i]
            i2 = interval[i + 1]

            if i1.end > i2.start:
                return False
        
        return True
How to create a list of object in Python class - GeeksforGeeks
A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and…www.geeksforgeeks.org
檢查 list 列表是否為空
mylist = list() # or mylist = []
print(type(mylist))
print(len(mylist))
if len(mylist) == 0:
    print('mylist is empty')
# <class 'list'>
# 0
# mylist is empty
# https://shengyu7697.github.io/python-check-list-empty/
List append()
list.append(item)
item - an item (number, string, list etc.) to be added at the end of the list

# neetcode-two sum
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        Ans = []
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if (nums[i] + nums[j]) == target:
                    Ans.append(i)
                    Ans.append(j)
                    return Ans
        return False
enumerate()
enumerate() 函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在 for 循环当中。
enumerate(sequence, [start=0])
sequence - 一个序列、迭代器或其他支持迭代对象。
start - 下标起始位置。

seq = ['one', 'two', 'three']
for i, element in enumerate(seq):
    print(i, element)
# 0 one
# 1 two
# 2 three
pop()
Python List pop() Method - GeeksforGeeks
Learn all about the Python list pop() method. Here in this tutorial, you will get a detailed explanation of the list…www.geeksforgeeks.org
宣告list的長度
ans = [0] * (n) #宣告list的長度
Python - 2-D Array
#宣告二維array
rows, cols = (5, 5)
arr = [[0]*cols]*rows
print(arr)

#output
[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
rows, cols = (5, 5)
arr = [[0 for i in range(cols)] for j in range(rows)]
print(arr)

#output
[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
from array import *

T = [[11, 12, 5, 2], [15, 6,10], [10, 8, 12, 5], [12,15,8,6]]
for r in T:
   for c in r:
      print(c,end = " ")
   print()

# output
11 12 5 2 
15 6 10 
10 8 12 5 
12 15 8 6 
from array import *

T = [[11, 12, 5, 2], [15, 6,10], [10, 8, 12, 5], [12,15,8,6]]

T[2] = [11,9]
T[0][3] = 7
for r in T:
   for c in r:
      print(c,end = " ")
   print()

# output
11 12 5  7 
15  6 10 
11  9 
12 15 8  6 
Python - 2-D Array
Python - 2-D Array - Two dimensional array is an array within an array. It is an array of arrays. In this type of array…www.tutorialspoint.com
Python | Using 2D arrays/lists the right way - GeeksforGeeks
A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and…www.geeksforgeeks.org
list.append(list) 把list加進list
res = [] 
res.append([nums[i], nums[j], nums[k]])
#neetcode Three Integer Sum
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []

        nums.sort()

        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                for k in range(j + 1, len(nums)):
                    if nums[i] + nums[j] + nums[k] == 0 and [nums[i], nums[j], nums[k]] not in res:
                        res.append([nums[i], nums[j], nums[k]])

        return res
Check if element exists in list in Python
lst=[ 1, 6, 3, 5, 3, 4 ] 
#checking if element 7 is present
# in the given list or not
i=7 
# if element present then return
# exist otherwise not exist
if i in lst: 
    print("exist") 
else: 
    print("not exist")
#output
not exist
res = []

if [nums[i], nums[j], nums[k]] not in res:
Stack and Queues in Python
stack:  is a linear data structure that follows the Last-In-First-Out (LIFO) principle
queue: is a linear data structure that follows the First-In-First-Out (FIFO)principle.

# Python code to demonstrate Implementing  
# stack using list 
stack = ["Amar", "Akbar", "Anthony"] 
stack.append("Ram") 
stack.append("Iqbal") 
print(stack) 
  
# Removes the last item 
print(stack.pop()) 
  
print(stack) 
  
# Removes the last item 
print(stack.pop()) 
  
print(stack) 

#output
['Amar', 'Akbar', 'Anthony', 'Ram', 'Iqbal']
Iqbal
['Amar', 'Akbar', 'Anthony', 'Ram']
Ram
['Amar', 'Akbar', 'Anthony']
# Python code to demonstrate Implementing  
# Queue using list 
queue = ["Amar", "Akbar", "Anthony"] 
queue.append("Ram") 
queue.append("Iqbal") 
print(queue) 
  
# Removes the first item 
print(queue.pop(0)) 
  
print(queue) 
  
# Removes the first item 
print(queue.pop(0)) 
  
print(queue) 
# output
['Amar', 'Akbar', 'Anthony', 'Ram', 'Iqbal']
Amar
['Akbar', 'Anthony', 'Ram', 'Iqbal']
Akbar
['Anthony', 'Ram', 'Iqbal']
break, continue, pass
break：強制跳出 ❮整個❯ 迴圈
continue：強制跳出 ❮本次❯ 迴圈，繼續進入下一圈
pass：不做任何事情，所有的程式都將繼續
count=0
for string in 'content':
    count+=1
    if string == 't':
        break
    print(string)
    
print('\n迴圈結束')
print('迴圈執行了 %d 次' %count)
#output
# c
# o
# n

# 迴圈結束
# 迴圈執行了四次
#https://medium.com/%40chiayinchen/1-%E5%88%86%E9%90%98%E6%90%9E%E6%87%82-python-%E8%BF%B4%E5%9C%88%E6%8E%A7%E5%88%B6-break-continue-pass-be290cd1f9d8
Dictionary + HashMap + get()
Dictionary
Python 初學第九講 - 字典
Dictionary，另一個存資料的好方法medium.com
Python 字典(Dictionary) values()方法
Python 字典(Dictionary) values() 函数以列表返回字典中的所有值
#!/usr/bin/python

tinydict = {'Name': 'Runoob', 'Age': 7}

print "Value : %s" %  tinydict.values()

# outpute:
# Value : [7, 'Runoob']
Python 字典(Dictionary) values()方法
Python 字典(Dictionary) values()方法 Python 字典 描述 Python 字典(Dictionary) values() 函数以列表返回字典中的所有值。 语法 values()方法语法：…www.runoob.com
defaultdict()
from collections import defaultdict
# 使用 defaultdict 來自 collections 模組，這是一種特殊的字典，可以在鍵不存在時自動為其分配一個默認值。

ans = defaultdict(list)
# 初始化 ans 為一個 defaultdict，其默認值是一個空列表。
HashMap
# neetcode-Valid Anagram
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        countS = {}  #!!!!!
        countT = {}  #!!!!!

        for i in range(len(s)):
            count[s[i]] = countS.get(s[i], 0) + 1  #!!!!!
            count[t[i]] = countT.get(t[i], 0) + 1  #!!!!!
        
        return countS == countT
# neetcode-two sum
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevmap = {}
        
        for i, element in enumerate(nums):
            diff = target - element
            if diff in prevmap:   #!!!!!!!
                return [prevmap[diff], i]
            prevmap[element] = i
get()
dict.get(key, value)
key -- 字典中要查找的键。
value -- 可选，如果指定键的值不存在时，返回该默认值。

tinydict = {'Name': 'Runoob', 'Age': 27}

print ("Age : ", tinydict.get('Age'))

# 没有设置 Sex，也没有设置默认的值，输出 None
print ("Sex : ", tinydict.get('Sex'))  

# 没有设置 Salary，输出默认的值  0.0
print ('Salary: ', tinydict.get('Salary', 0.0))

# output
# Age : 27
# Sex : None
# Salary: 0.0
get() 方法 Vs dict[key] 访问元素区别
get(key) 方法在 key（键）不在字典中时，可以返回默认值 None 或者设置的默认值。
dict[key] 在 key（键）不在字典中时，会触发 KeyError 异常。

>>> runoob = {}
>>> print('URL: ', runoob.get('url'))     # 返回 None
URL:  None

>>> print(runoob['url'])     # 触发 KeyError
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'url'
>>>
Python3 字典 get() 方法
Python3 字典 get() 方法 Python3 字典 描述 Python 字典 get() 函数返回指定键的值。 语法 get()方法语法： dict.get(key[, value]) 参数 key -- 字典中要查找的键。…www.runoob.com
Dictionary items()
# Python program to show working 
# of items() method in Dictionary 

# Dictionary with three items 
Dictionary1 = { 'A': 'Geeks', 'B': 4, 'C': 'Geeks' } 

print("Dictionary items:") 

# Printing all the items of the Dictionary 
print(Dictionary1.items())

# output
Dictionary items:
dict_items([('A', 'Geeks'), ('B', 4), ('C', 'Geeks')])
Python Dictionary items() method - GeeksforGeeks
A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and…www.geeksforgeeks.org
如何取tuple in list 中tuple的所有值
for n, c in dic.items():  

# neetcode: Top K Elements in List
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        dic = {}    # key -> list中的數字; value -> 數有幾次
        count = [[]for i in range(len(nums) + 1)]  # 1 * (len(nums) + 1) array, count[1]存數到一次的數字, 以此類推
        ans = []

        for n in nums:
            dic[n] = dic.get(n, 0) + 1
        # 跟dic 反向存到2-dim array
        for n, c in dic.items():  
            count[c].append(n)
        # 從最多的開始往下找
        for i in range(len(nums), 0, -1):
            if count[i] != []:
                for num in count[i]:
                    ans.append(num)
            if len(ans) >= k:
                return ans

        return False
string
ord()
The ord() function returns the number representing the unicode code of a specified character.

x = ord("h")

print(x)

# 104
Remove Whitespace from String
def remove(string):
  return string.replace(" ", "")
# Driver Program
string = ' g e e k '
print(remove(string))

# geek
Remove all characters other than alphabets from string
# Python program to remove all the 
# characters other than alphabets
 
# Function to remove special characters 
# and store it in another variable
def removeSpecialCharacter(s):
    t = ""
    for i in s:
         
        # Store only valid characters
        if (i >= 'A' and i <= 'Z') or (i >= 'a' and i <= 'z'):
            t += i
    print(t)
 
# Driver code
s = "$Gee*k;s..fo, r'Ge^eks?"
removeSpecialCharacter(s)

# output: GeeksforGeeks
Remove all characters other than alphabets from string - GeeksforGeeks
A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and…www.geeksforgeeks.org
String Slices
A "slice" in Python is powerful way of referring to sub-parts of a string. The syntax is s[i:j]meaning the substring starting at index i, running up to but not including index j.
s = 'Hello'
  #    01234    ## Showing the index numbers for the 'Hello'
  s[1:4]  ## 'ell' -- starting at 1, up to but not including 4
  s[0:2]  ## 'He'
If the first slice number is omitted, it just uses the start of the string, and likewise if the second slice number is omitted, the slice runs through the end of the string.
s = 'Hello'
  #    01234
  s[:2]  ## 'He', omit first number uses start of string
  s[2:]  ## 'llo', omit second number uses end of string
字串處理 lower() upper() capitalize() title()
upper() : 將所有字母改為大寫
lower() : 將所有字母改為小寫
capitalize() : 將字串中的第一個字母大寫，其餘小寫
title() : 將每組單詞(空格區分)的第一個字母大寫，其餘小寫

iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天
iT 邦幫忙是 IT 領域的技術問答與分享社群，透過 IT 人互相幫忙，一起解決每天面臨的靠北時刻。一起來當 IT 人的超級英雄吧，拯救下一個卡關的 IT 人ithelp.ithome.com.tw
ignores all non-alphanumeric characters
# neetcode-Is Palindrome
def removeNonAlpha(self, s: str) -> str:
        t = ''
        
        for i in s:
            if (i >= 'A' and i <= 'Z') or (i >= 'a' and i <= 'z') or (i >= '0' and i <= '9'):
                t = t + i
        return t
Linked List
Python Linked List - GeeksforGeeks
A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and…www.geeksforgeeks.org
確認是否已經到linked list的尾巴
while list1 != None and list2 != None #尾巴不是node，單純是None
sort()
Sorting List of Tuples by a Specific Element
# Original list of tuples
people = [("Alice", 25), ("Bob", 30), ("Charlie", 22), ("David", 28)]
 
# Sorting by the second element of each tuple (age)
people.sort(key=lambda x: x[1])
 
# Displaying the sorted list
print("Sorted by Age:", people)
sort() in Python - GeeksforGeeks
A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and…www.geeksforgeeks.org
Tuples
元組（tuple）是 Python 中的一種數據結構，它類似於列表，但有一些重要的區別。元組是不可變的，這意味著一旦創建，元組的元素就不能被修改、添加或刪除。
元組的特點
不可變：元組一旦創建，其中的元素就不能改變。
有序：元組中的元素按它們被添加的順序存儲。
可包含多種類型的元素：元組可以包含不同類型的數據，例如整數、浮點數、字符串、列表甚至其他元組。
使用圓括號表示：元組用圓括號 () 表示，而列表用方括號 [] 表示。