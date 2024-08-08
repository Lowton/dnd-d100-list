document.addEventListener('DOMContentLoaded', () => {
    const listGroup = document.getElementById('listGroup');
    const listTableBody = document.getElementById('listTableBody');
    const columnNameHeader = document.getElementById('columnNameHeader');
    const toggleButton = document.getElementById('toggleButton');
    const sidebar = document.getElementById('sidebar');

    // Fetch JSON data from an external file
    fetch('data.json')
        .then(response => response.json())
        .then(lists => {
            // Sort lists alphabetically by name
            lists.sort((a, b) => a.name.localeCompare(b.name));

            // Populate the sidebar with list names
            lists.forEach((list, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = list.name;
                listItem.addEventListener('click', () => displayList(list));
                listGroup.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Function to display the selected list
    function displayList(list) {
        columnNameHeader.textContent = list.columnName;
        listTableBody.innerHTML = '';
        list.list.forEach((item, index) => {
            const row = document.createElement('tr');
            const d100Cell = document.createElement('td');
            const itemCell = document.createElement('td');
            d100Cell.textContent = index + 1;
            itemCell.textContent = item;
            row.appendChild(d100Cell);
            row.appendChild(itemCell);
            listTableBody.appendChild(row);
        });
    }

    // Toggle sidebar
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
});
