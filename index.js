// index.js - Funcionalidades del CRM Corporativo

document.addEventListener('DOMContentLoaded', function() {
    // Toggle para completar tareas
    const checkboxes = document.querySelectorAll('.task-checkbox input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            const taskDue = taskItem.querySelector('.task-due');
            
            if (this.checked) {
                taskDue.textContent = 'Completada';
                taskDue.classList.remove('urgent');
                taskDue.style.color = '#27ae60';
                taskItem.style.opacity = '0.7';
            } else {
                taskDue.textContent = 'Vence en 3 días';
                taskDue.style.color = '';
                taskItem.style.opacity = '1';
            }
        });
    });
    
    // Notificación click
    const notification = document.querySelector('.notification');
    const notificationBadge = document.querySelector('.notification-badge');
    
    notification.addEventListener('click', function() {
        notificationBadge.style.display = 'none';
        alert('Notificaciones marcadas como leídas');
    });
    
    // Navegación del calendario
    const prevBtn = document.querySelector('.calendar-nav button:first-child');
    const nextBtn = document.querySelector('.calendar-nav button:last-child');
    const calendarMonth = document.querySelector('.calendar-header h4');
    
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let currentMonth = 5; // Junio (0-indexed)
    
    function updateCalendar() {
        calendarMonth.textContent = `${months[currentMonth]} 2023`;
        
        // Actualizar días del calendario (simplificado)
        const daysContainer = document.querySelector('.calendar-days');
        daysContainer.innerHTML = '';
        
        // Días del mes (simulación)
        const daysInMonth = 30;
        const startDay = 3; // Miércoles para junio 2023
        
        // Días del mes anterior
        for (let i = 0; i < startDay; i++) {
            const day = document.createElement('div');
            day.textContent = 30 - (startDay - i - 1);
            day.style.color = '#ccc';
            daysContainer.appendChild(day);
        }
        
        // Días del mes actual
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.textContent = i;
            
            // Marcar días con eventos (12 y 15)
            if (i === 12 || i === 15) {
                day.classList.add('event');
            }
            
            // Marcar día actual
            if (i === 12) {
                day.classList.add('today');
            }
            
            day.addEventListener('click', function() {
                document.querySelectorAll('.calendar-days div').forEach(d => d.classList.remove('today'));
                this.classList.add('today');
                alert(`Has seleccionado el ${i} de ${months[currentMonth]}`);
            });
            
            daysContainer.appendChild(day);
        }
        
        // Días del siguiente mes
        const remainingCells = 42 - (startDay + daysInMonth); // 6 filas * 7 columnas = 42 celdas
        for (let i = 1; i <= remainingCells; i++) {
            const day = document.createElement('div');
            day.textContent = i;
            day.style.color = '#ccc';
            daysContainer.appendChild(day);
        }
    }
    
    prevBtn.addEventListener('click', function() {
        currentMonth = (currentMonth - 1 + 12) % 12;
        updateCalendar();
    });
    
    nextBtn.addEventListener('click', function() {
        currentMonth = (currentMonth + 1) % 12;
        updateCalendar();
    });
    
    // Resaltar día clickeado en calendario
    const calendarDays = document.querySelectorAll('.calendar-days div');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            if (!this.style.color || this.style.color !== 'rgb(204, 204, 204)') {
                calendarDays.forEach(d => d.classList.remove('today'));
                this.classList.add('today');
            }
        });
    });
    
    // Funcionalidad de búsqueda
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.toLowerCase();
            if (query.trim()) {
                alert(`Buscando: "${query}"`);
                this.value = '';
            }
        }
    });
    
    // Funcionalidad de botones de edición/eliminación de tareas
    const editButtons = document.querySelectorAll('.task-actions button:first-child');
    const deleteButtons = document.querySelectorAll('.task-actions button:last-child');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const taskTitle = this.closest('.task-item').querySelector('.task-title').textContent;
            const newTitle = prompt('Editar tarea:', taskTitle);
            if (newTitle && newTitle.trim()) {
                this.closest('.task-item').querySelector('.task-title').textContent = newTitle;
            }
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const taskItem = this.closest('.task-item');
            const taskTitle = taskItem.querySelector('.task-title').textContent;
            
            if (confirm(`¿Estás seguro de eliminar la tarea: "${taskTitle}"?`)) {
                taskItem.remove();
                
                // Actualizar contador de tareas pendientes
                const tasksCount = document.querySelectorAll('.task-checkbox input:not(:checked)').length;
                document.querySelector('.stat-info h3').textContent = tasksCount;
            }
        });
    });
});