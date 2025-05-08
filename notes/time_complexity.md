# Time complexity
## Average Time Complexity of HashMap = O(1)
- Average Case:
    - Insertion (average): O(1)
    - Lookup (average): O(1)
    - Deletion (average): O(1)

- Worst Case:
    - Insertion (worst): O(n), where n is the size of the hash map. This occurs when there are many hash collisions, leading to linear probing or other collision resolution strategies that may involve traversing the entire hash map.
    - Lookup and Deletion (worst): O(n), for the same reason as insertion.

## Refercences
- [What is a Hash Map? Time Complexity and Two Sum Example](https://www.freecodecamp.org/news/what-is-a-hash-map/?source=post_page-----402efeee395e---------------------------------------)
- [Time Complexity of HashMap get is O(1). Why?](https://medium.com/@prinswu/time-complexity-of-hashmap-get-is-o-1-why-7b845390594)
- Reference from my own artical on medium: [Time complexity](https://medium.com/@LiuIan/time-complexity-402efeee395e)