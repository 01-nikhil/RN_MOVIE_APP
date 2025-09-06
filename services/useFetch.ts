import { useEffect, useState } from "react"

export const useFetch=<T>(fetchFunctions:()=>Promise<T>,autoFetch=true)=>{

    const[data,setData]=useState<T|null>(null);
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState<Error|null>(null);

    const fetchData=async()=>{
        try {
            setLoading(true);
            setError(null);
            const result=await fetchFunctions();
            setData(result);
        } catch (error) {
            //@ts-ignore
            setError(error instanceof Error?error:new Error('An error occured'));
        }
        finally{
            setLoading(false);
        }
    }

    const reset=()=>{
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    },[]);

    return {data,error,refetch:fetchData,loading,reset};

}