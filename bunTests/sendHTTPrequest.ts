//Pequeño ejemplo para ver la implementacion del fetch en bun

const response1 = await fetch("https://bun.sh");
const html = await response1.text();

if (response1.ok) {
    const html = await response1.text();
    console.log(html);
  } else {
    console.error("Error:", response1.status); 
  }



//Otro pero con POST
const response2 = await fetch("https://bun.sh/api", {
  method: "POST",
  body: JSON.stringify({ message: "Hello from Bun!" }),
  headers: { "Content-Type": "application/json" },
});

if (response2.ok) {
    const responseData = await response2.json();
    console.log(responseData);
  } else {
    console.error("Error:", response2.status); 
  }
