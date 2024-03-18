#include <dirent.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define FILE_ 0b0000
#define DIROTORY 0b0001

struct StorageI{
  char *name;
  char type;
};
typedef struct StorageI StorageI;
typedef const char *string;
struct StorageData
{
  StorageI *elements;
  int size;
};
typedef struct StorageData StorageData;

StorageData Init_StorageData()
{
  StorageData data;
  data.elements = NULL;
  data.size = 0;
  return data;
}

void StorageData_AllocMemory(StorageData *data)
{
  data->size = data->size + 1;
  if (data->size == 1)
    data->elements = (StorageI *)malloc(sizeof(StorageI));
  else
    data->elements = (StorageI *)realloc(data->elements, sizeof(StorageI) * data->size);
}

void StorageData_FreeMemory(StorageData *data){
  for (int index = 0; index < data->size; index++)
    free(data->elements[index].name);
  
  free(data->elements);
}

StorageData info(string dir_)
{
  DIR *d;
  struct dirent *dir;
  d = opendir(dir_);
  StorageData ar = Init_StorageData();
  if (d)
  {
    while ((dir = readdir(d)) != NULL)
    {
      StorageData_AllocMemory(&ar);
      int index = ar.size - 1;
      ar.elements[index].name = strdup(dir->d_name);
      if (dir->d_type == DT_DIR)
        ar.elements[index].type = DIROTORY;
      else
        ar.elements[index].type = FILE_;
    }
    closedir(d);
  }
  return ar;
}

/*
int main()
{
  StorageData ar = info("/home/theo-pi/Desktop/Nebula");
  for (int i = 0; i < ar.size; i++)
  {
    printf("%s \t ", ar.elements[i].name);
    (ar.elements[i].type == 0b000) ? printf("File\n") : printf("Diretory\n");
  }
  StorageData_FreeMemory(&ar);
  printf("Total files -> %i\n", ar.size);
  return 0;
}
*/