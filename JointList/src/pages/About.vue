<template>
    <div class="container">
        <div class="about">
            <h2 class="title-bold">Приложение списка дел с кастомным календарем.</h2>
            <p>Вы можете:</p>
            <ul class="feature-list list">
                <li>1. Создавать списки дел или покупок на странице списка, или создать список сразу на дату в разделе "Календарь".</li>
                <li>2. Изменить назначенную дату при необходимости с помощью кнопки <i class="pi pi-calendar-plus"></i>.</li>
                <li>3. Добавлять новые задачи в ранее созданный список ✚.</li>
                <li>4. Редактировать задачи списка ✎.</li>
                <li>5. Искать списки по названию в разделе "Список".</li>
                <li>6. Искать списки по дням календаря в разделе "Календарь".</li>
                <li>7. Открыть список на отдельной странице с помощью кнопки <i class="pi pi-folder-open"></i>.</li>
            </ul>
            <p>Списки дел окрашены разными цветами в зависимости от назначенной даты:</p>
            <ul class="color-coding list">
                <li><span class="red-text">Красный</span> - Список устарел. Назначен на дату ранее, чем сегодня.</li>
                <li><span class="orange-text">Оранжевый</span> - Список дел назначен на сегодня.</li>
                <li><span class="blue-text">Синий</span> - Список дел назначен на будущее.</li>
            </ul>
            <p>Адаптация приложения для декстопных разрешений присутствует, но приложение рекомендуется использовать на мобильных устройствах.<br>
            Приложение находится в разработке.
            </p>
            <div class="links">
            <a :href="linkToPage" target="_blank">GitHub</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            linkToPage: 'https://github.com/Nostromo2113/Nostromo-Pet-Projects/tree/main/JointList'
        };
    }
}
</script>
<style lang="scss" scoped>

.about {
    font-size: clamp(0.875rem, 0.542rem + 1.33vw, 1.375rem);
    margin: auto;
    margin-top: 5%;
    padding: 15px;
    font-family: monospace;
}

.title-bold {
    margin-bottom: 10px;
}
.list{
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 10px;
}
.feature-list {
    list-style: disc;
    margin-left: 20px;
    margin-bottom: 16px;
}

.color-coding {
    list-style: none;
    padding-left: 20px;
    margin-bottom: 30px;
}

.red-text {
    color: red;
}

.orange-text {
    color: orange;
}

.blue-text {
    color: blue;
}

.links {
    margin-top: 5%;
    margin-right: 0;
    text-align: right;
}
</style>