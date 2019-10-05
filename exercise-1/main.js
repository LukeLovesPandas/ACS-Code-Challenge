
const endpoint = 'http://5d7a59779edf7400140aa043.mockapi.io/dieter';

const listTemplate = `
{{#if people}}
    <h3> List of People </h3>
    <ul class="people_list">
        {{#each people}}
            <li>
                <div class="person">
                    <img src="{{this.avatar}}">
                    <span class="name">{{this.name}}</span>
                    <div id="{{this.id}}_details" class="details" style="display: none">
                            <span>ID: {{this.id}}</span>
                            <span>CreatedAt: {{this.createdAt}}</span>
                    </div>
                    <button onclick="toggleDetails({{this.id}})">Show Additional Details</button>
                    <button onclick="deletePerson({{this.id}})">Remove From List</button>
                </div>           
            </li>         
        {{/each}}
    </ul>
{{else}}
    We could not find any users at the moment. Sorry.
{{/if}}                    
`;

const loadData = async () => {
    let people = await fetch(endpoint)
        .then(async (fetchResponse) => fetchResponse.ok ? fetchResponse.json() : []);          
    var template  = Handlebars.compile(listTemplate);
    var context = {people};
    var html = template(context);
    document.getElementById('main').innerHTML = html;
}

const deletePerson = async (index) => {
    await fetch(`${endpoint}/${index}`, { method: 'DELETE' });
    await loadData();
}

const toggleDetails = (id) => {
    const detailsElement = document.getElementById(`${id}_details`);
    detailsElement.style.display = detailsElement.style.display === 'none' ? '' : 'none';
}

loadData();




