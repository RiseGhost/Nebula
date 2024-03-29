#include <node_api.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "Storage.h"

using namespace std;

short digits(int number){
	short count = 0;
	while (number >= 1){
		number /= 10;
		count++;
	}
	return count;
}

napi_value CreateNapiString(napi_env env, const char *string)
{
	napi_value str;
	napi_create_string_utf8(env, string, strlen(string), &str);
	return str;
}

char *NapiValue_To_String(napi_value s, napi_env env)
{
	size_t strlen;
	napi_get_value_string_utf8(env, s, NULL, 0, &strlen);
	char *str = (char *)malloc(sizeof(char) * (strlen + 1));
	napi_get_value_string_utf8(env, s, str, strlen + 1, NULL);
	return str;
}

napi_value ObjectStorageType(napi_env env, StorageI s)
{
	napi_value StorageType;
	napi_create_object(env, &StorageType);
	napi_value name, type;
	napi_create_string_utf8(env, s.name, strlen(s.name), &name);
	if (s.type == FILE_)
		napi_create_string_utf8(env, "file", 4, &type);
	else
		napi_create_string_utf8(env, "dir", 3, &type);
	napi_set_named_property(env, StorageType, "name", name);
	napi_set_named_property(env, StorageType, "type", type);
	return StorageType;
}

napi_value ObjectStorageInfo(napi_env env, napi_value dir_path)
{
	napi_value Storage;
	const char *path = NapiValue_To_String(dir_path, env);
	StorageData data = info(path);
	napi_create_array_with_length(env, data.size, &Storage);
	napi_create_object(env, &Storage);
	for (int index = 0; index < data.size; index++){
		napi_value element = ObjectStorageType(env, data.elements[index]);
		char *index_number = (char *)malloc(sizeof(char) * digits(index+1));
		sprintf(index_number,"%i",index);
		napi_set_named_property(env,Storage,index_number,element);
		napi_set_element(env, Storage, index, element);
		free(index_number);
	}
	StorageData_FreeMemory(&data);
	return Storage;
}

napi_value StorageInfo(napi_env env, napi_callback_info info)
{
	size_t argc = 1;
	napi_value argv[1];
	napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
	return ObjectStorageInfo(env, argv[0]);
}

napi_value RenameFile(napi_env env, napi_callback_info info){
	size_t argc = 2;
	napi_value argv[2];
	napi_get_cb_info(env,info,&argc,argv,NULL,NULL);
	int Rename = rename(NapiValue_To_String(argv[0],env),NapiValue_To_String(argv[1],env));
	if (Rename == 0) 	return CreateNapiString(env,"Sucess");
	else				return CreateNapiString(env,"Error");
}

napi_value init(napi_env env, napi_value exports)
{
	napi_value func_StorageInfo, func_Rename;
	napi_create_function(env, nullptr, 0, StorageInfo, nullptr, &func_StorageInfo);
	napi_create_function(env, nullptr, 0, RenameFile, nullptr, &func_Rename);
	napi_set_named_property(env, exports, "StorageInfo", func_StorageInfo);
	napi_set_named_property(env, exports, "RenameFile", func_Rename);
	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init);