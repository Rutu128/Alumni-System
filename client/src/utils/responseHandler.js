export default function handleResponse(res){
    if(res.response){
        if(res.response.status !== 200){
            console.log('Catched an error: ', res.response.status);
            return {
                status: res.response.status,
            }
        }
    }
    else if(res.data){
        if((res.data.statusCode === 200 | 202) || (res.status === 200 | 202)){
            console.log('Success');
            
            return {
                status: 200,
            }
        }
    }
}