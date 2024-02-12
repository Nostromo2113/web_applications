<template>
    <div class="container">
        <div class="about">
            <h2 class="title-bold">To-do list app with calendar. The application supports authorization and data storage on the <a :href="'https://supabase.com/'" target="_blank">Supabase</a> server.</h2>
            <p>You can:</p>
            <ul class="feature-list list">
                <li>1. Create to-do or shopping lists on the list page, or create a list directly for a date in the
                    "Calendar" section.</li>
                <li>2. Change the assigned date if necessary using the <i class="pi pi-calendar-plus"></i> button.</li>
                <li>3. Add new tasks to a previously created list ✚.</li>
                <li>4. Edit list tasks.</li>
                <li>5. Search for lists by name in the "List" section.</li>
                <li>6. Search for lists by calendar days in the "Calendar" section.</li>
                <li>7. Open a list on a separate page using the <i class="pi pi-folder-open"></i> button.</li>
            </ul>
            <p>To-do lists are colored differently depending on the assigned date:</p>
            <ul class="color-coding list">
                <li><span class="violetblue-text">Violetblue</span> - List is overdue. Assigned for a date prior to today.</li>
                <li><span class="turquoise-text">Turquoise</span> - To-do list is assigned for today.</li>
                <li><span class="violet-text">Violet</span> - To-do list is assigned for the future.</li>
            </ul>
            <p>The application is adapted for desktop resolutions, but it is recommended to use the application on mobile
                devices.<br>
                The application appeared during the learning process. Code is gradually curing childhood diseases.
            </p>
            <div class="links">
                <a :href="linkToPage" target="_blank">GitHub</a>
            </div>
        </div>
    </div>
    <div>
    </div>
</template>
<script>
import Calendar from '../components/calendar/Calendar.vue';

export default {
    data() {
        return {
            linkToPage: 'https://github.com/Nostromo2113/Nostromo-Pet-Projects/tree/main/JointList'
        };
    },
    components: { Calendar }
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

.violetblue-text {
    color: $violetblue;
}

.turquoise-text {
    color: $turquoise;
}

.violet-text {
    color: $violet;
}

.links {
    margin-top: 5%;
    margin-right: 0;
    text-align: right;
}
</style>