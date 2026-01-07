// index.js - CRM con Funcionalidades Tecnológicas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips
    initTooltips();
    
    // Inicializar funcionalidad de checkboxes personalizados
    initCustomCheckboxes();
    
    // Funcionalidad de notificaciones
    const notification = document.querySelector('.notification');
    const notificationBadge = document.querySelector('.notification-badge');
    
    notification.addEventListener('click', function() {
        notificationBadge.style.display = 'none';
        showNotificationToast('Notificaciones marcadas como leídas');
    });
    
    // Funcionalidad de búsqueda AI
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            showAIProcessing(query);
            searchInput.value = '';
        }
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                showAIProcessing(query);
                this.value = '';
            }
        }
    });
    
    // Efecto de hover en tarjetas de estadísticas
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.stat-glow');
            glow.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.stat-glow');
            glow.style.opacity = '0';
        });
    });
    
    // Funcionalidad de botones de acción rápida
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const actions = [
                'Activando asistente AI...',
                'Alternando vista de dashboard...'
            ];
            showNotificationToast(actions[index]);
        });
    });
    
    // Funcionalidad de edición de tareas
    const editButtons = document.querySelectorAll('.btn-icon-sm');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const taskItem = this.closest('.task-item');
            const taskTitle = taskItem.querySelector('.task-title').textContent;
            
            const newTitle = prompt('Editar tarea AI:', taskTitle);
            if (newTitle && newTitle.trim()) {
                taskItem.querySelector('.task-title').textContent = newTitle;
                showNotificationToast('Tarea actualizada');
            }
        });
    });
    
    // Actualizar contador de tareas pendientes
    updatePendingTasksCount();
    
    // Simulación de estado del sistema
    simulateSystemStatus();
    
    // Inicializar efectos de hover en tablas
    const tableRows = document.querySelectorAll('table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Funciones auxiliares
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.pointerEvents = 'none';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

function initCustomCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox-wrapper input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            const taskDue = taskItem.querySelector('.task-due');
            
            if (this.checked) {
                taskDue.textContent = ' Completada';
                taskDue.className = 'task-due completed';
                taskDue.innerHTML = '<i class="fas fa-check-circle"></i> Completada';
                taskItem.style.opacity = '0.7';
                
                // Actualizar contador de tareas pendientes
                setTimeout(updatePendingTasksCount, 300);
            } else {
                taskDue.textContent = ' En progreso';
                taskDue.className = 'task-due';
                taskDue.innerHTML = '<i class="fas fa-clock"></i> En progreso';
                taskItem.style.opacity = '1';
                
                // Actualizar contador de tareas pendientes
                setTimeout(updatePendingTasksCount, 300);
            }
        });
    });
}

function showAIProcessing(query) {
    // Mostrar efecto de carga
    const processingToast = document.createElement('div');
    processingToast.className = 'ai-processing-toast';
    processingToast.innerHTML = `
        <div class="ai-processing-content">
            <div class="ai-processing-icon">
                <i class="fas fa-robot"></i>
                <div class="ai-pulse"></div>
            </div>
            <div class="ai-processing-text">
                <div class="ai-processing-title">Procesando con AI...</div>
                <div class="ai-processing-query">"${query}"</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(processingToast);
    
    // Estilos para el toast
    processingToast.style.position = 'fixed';
    processingToast.style.bottom = '20px';
    processingToast.style.right = '20px';
    processingToast.style.background = 'rgba(26, 31, 46, 0.95)';
    processingToast.style.border = '1px solid rgba(99, 102, 241, 0.3)';
    processingToast.style.borderRadius = '12px';
    processingToast.style.padding = '15px';
    processingToast.style.zIndex = '1000';
    processingToast.style.backdropFilter = 'blur(10px)';
    processingToast.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    processingToast.style.minWidth = '300px';
    processingToast.style.transform = 'translateY(100px)';
    processingToast.style.opacity = '0';
    processingToast.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        processingToast.style.transform = 'translateY(0)';
        processingToast.style.opacity = '1';
    }, 10);
    
    // Simular procesamiento AI
    setTimeout(() => {
        processingToast.querySelector('.ai-processing-title').textContent = 'Resultados encontrados:';
        processingToast.querySelector('.ai-processing-query').innerHTML = `
            <div style="margin-top: 8px; font-size: 13px; color: #94a3b8;">
                <div>• 12 clientes relacionados</div>
                <div>• 5 tareas similares</div>
                <div>• 3 tendencias identificadas</div>
            </div>
        `;
        
        // Cerrar automáticamente después de 5 segundos
        setTimeout(() => {
            processingToast.style.transform = 'translateY(100px)';
            processingToast.style.opacity = '0';
            setTimeout(() => {
                processingToast.remove();
            }, 300);
        }, 5000);
    }, 1500);
}

function showNotificationToast(message) {
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Estilos para el toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.background = 'rgba(26, 31, 46, 0.95)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.border = '1px solid rgba(99, 102, 241, 0.3)';
    toast.style.zIndex = '1000';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function updatePendingTasksCount() {
    const pendingTasks = document.querySelectorAll('.checkbox-wrapper input[type="checkbox"]:not(:checked)').length;
    const tasksStat = document.querySelector('.stat-icon.tasks').closest('.stat-card').querySelector('.stat-info h3');
    tasksStat.textContent = pendingTasks;
    
    // Actualizar cambio porcentual
    const statChange = document.querySelector('.stat-icon.tasks').closest('.stat-card').querySelector('.stat-change');
    const prevTasks = 20; // Valor anterior simulado
    const change = Math.round(((prevTasks - pendingTasks) / prevTasks) * 100);
    
    if (change > 0) {
        statChange.innerHTML = '<i class="fas fa-arrow-up"></i> ' + change + '%';
        statChange.className = 'stat-change positive';
    } else {
        statChange.innerHTML = '<i class="fas fa-arrow-down"></i> ' + Math.abs(change) + '%';
        statChange.className = 'stat-change negative';
    }
}

function simulateSystemStatus() {
    const cpuElement = document.querySelector('.system-status span:nth-child(3)');
    const memoryElement = document.querySelector('.system-status span:nth-child(5)');
    
    function updateSystemMetrics() {
        // Simular valores de CPU y memoria
        const cpu = Math.floor(Math.random() * 10) + 20; // 20-30%
        const memory = Math.floor(Math.random() * 15) + 55; // 55-70%
        
        cpuElement.innerHTML = `<i class="fas fa-server"></i> CPU: ${cpu}%`;
        memoryElement.innerHTML = `<i class="fas fa-database"></i> Memoria: ${memory}%`;
    }
    
    // Actualizar cada 10 segundos
    updateSystemMetrics();
    setInterval(updateSystemMetrics, 10000);
}

// Efectos de partículas para fondo (opcional)
function initParticles() {
    const container = document.querySelector('.main-content');
    const particles = document.createElement('div');
    particles.className = 'particles';
    container.appendChild(particles);
    
    // Estilos para partículas
    particles.style.position = 'fixed';
    particles.style.top = '0';
    particles.style.left = '0';
    particles.style.width = '100%';
    particles.style.height = '100%';
    particles.style.pointerEvents = 'none';
    particles.style.zIndex = '0';
    particles.style.overflow = 'hidden';
    
    // Crear partículas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(99, 102, 241, 0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.3)';
        
        particles.appendChild(particle);
        
        // Animación de partículas
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let dx = (Math.random() - 0.5) * 0.2;
    let dy = (Math.random() - 0.5) * 0.2;
    
    function move() {
        x += dx;
        y += dy;
        
        // Rebote en los bordes
        if (x <= 0 || x >= 100) dx = -dx;
        if (y <= 0 || y >= 100) dy = -dy;
        
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        
        requestAnimationFrame(move);
    }
    
    move();
}

// Inicializar partículas (opcional - descomentar si quieres el efecto)
// initParticles();
