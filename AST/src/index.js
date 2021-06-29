import parse from "./parse";

const template = `
    <div>
        <h3 class="box" id="box">你好</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>
`;

console.log(parse(template));
