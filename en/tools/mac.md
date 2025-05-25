# Timemechine
1. 格式化硬碟
    1. 程式佔用硬碟 
        - error message
            
            ```bash
            Erasing “PNY PNY PRO ELITE PS Media” (disk2) and creating “MacBackup”

            Unmounting disk
            The volume on disk2 couldn’t be unmounted because it is in use by process 318 (mds_stores)
            Couldn’t unmount disk. : (-69888)

            Operation failed…
            ```
        - `sudo lsof | grep /Volumes/PNYPROELITE`