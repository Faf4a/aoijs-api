# \DefaultAPI

All URIs are relative to *http://aoijs-api.vercel.app*

Method | HTTP request | Description
------------- | ------------- | -------------
[**FindGet**](DefaultAPI.md#FindGet) | **Get** /find | Returns a list of functions based on the search query.
[**FunctionsGet**](DefaultAPI.md#FunctionsGet) | **Get** /functions | Returns functions.



## FindGet

> FindGet200Response FindGet(ctx).Name(name).List(list).Execute()

Returns a list of functions based on the search query.

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	name := "name_example" // string | The name of the function to search for.
	list := int32(56) // int32 | The number of results to return. Defaults to 5. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DefaultAPI.FindGet(context.Background()).Name(name).List(list).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.FindGet``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `FindGet`: FindGet200Response
	fmt.Fprintf(os.Stdout, "Response from `DefaultAPI.FindGet`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiFindGetRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **string** | The name of the function to search for. | 
 **list** | **int32** | The number of results to return. Defaults to 5. | 

### Return type

[**FindGet200Response**](FindGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FunctionsGet

> []FunctionsGet200ResponseInner FunctionsGet(ctx).Execute()

Returns functions.



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DefaultAPI.FunctionsGet(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.FunctionsGet``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `FunctionsGet`: []FunctionsGet200ResponseInner
	fmt.Fprintf(os.Stdout, "Response from `DefaultAPI.FunctionsGet`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiFunctionsGetRequest struct via the builder pattern


### Return type

[**[]FunctionsGet200ResponseInner**](FunctionsGet200ResponseInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

