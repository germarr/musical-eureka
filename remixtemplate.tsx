import type { ActionFunction, LinksFunction, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import styles from "~/styles/tailwind.css"

export let links:LinksFunction = () =>{
  return[
    {
        rel:"stylesheet",
        href:styles,
    }
]
}

export let action:ActionFunction = async({request}) =>{
    let formData= await request.formData()
    let name = formData.get("nameof")
    console.log('🚗', {name})

    // const apiurl = "http://localhost:1111"
    // const res = await fetch(`${apiurl}/${name}`,{
    //     method:"post",
    //     body:JSON.stringify({name}),
    //     headers:{
    //         "Content-type":"application/json; charset=utf-8"
    //     }
    // })

    // return res.json()
    return name
}

export const meta: MetaFunction = () => {

  return { 
    title: "Remix Project",
    description:"TestApp" 
  };
};

export default function Index(){
    let actionData = useActionData()
    let state: "idle" | "success" | "error" = actionData?.subscription ? "success" : actionData?.error ? "error" : 'idle'

  return(
    <main className="flex w-screen h-screen items-center justify-center">
      <Form method='post'>
        <fieldset className="flex flex-col space-y-2 mt-5">
          <div className="border w-1/4">
            <input type='text' placeholder="steph" name="nameof"></input>
          </div>
          <div>
            <button className="bg-red-300 py-2 px-5 rounded-md" type="submit">
              Submit
            </button>
          </div>
        </fieldset>
      </Form>
      <p>{actionData?.error ? actionData.message : <>&nbsp;</>}</p>
    </main>
  )
}
