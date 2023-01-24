//Notifications collection
/*
    avatar: string
    name: string
    content: string
    date: string
    unread: boolean
    type: string (standar | link | message | picture)
    meta?: Object
            linkType?: string (post | group)
            linkText?: string 
            message?: string
            picture?: string
*/

const NotificationCollection = [
    {
        avatar: 'assets/images/avatar-mark-webber.webp',
        name: 'Mark Webber',
        content: 'reacted to your recent post',
        date: '1m ago',
        unread: true,
        type: 'link',
        meta: {
            linkType: 'post',
            linkText: 'My first tournament today!'
        }
    },
    {
        avatar: 'assets/images/avatar-kimberly-smith.webp',
        name: 'Kimberly Smith',
        content: 'commented on your picture',
        date: '1 week ago',
        unread: true,
        type: 'link',
        meta: {
            linkType: 'post',
            linkText: ''
        }
    }
]

// Get DOM elements
const mainElement = document.querySelector('.notifications');
const markAllAsReadElement = document.querySelector('.header__link');
const unreadCountElement = document.querySelector('.unread-count');

// Listen for click events
markAllAsReadElement.addEventListener('click', () => {
    markAllAsRead();
    reseatUnreadCount();
    removeAllNotifications();
    showAllNotifications(NotificationCollection);
});
// Mark all notifications as read
function markAllAsRead(){
    //Get all unread notifications
    // const unreadNotifications = document.querySelectorAll('.notification--unread');
    // unreadNotifications.forEach(notification => notification.classList.remove('notification--unread'));

    NotificationCollection.forEach(notification => notification.unread = false)
}

function reseatUnreadCount(){
    unreadCountElement.textContent = '0';
}

//Show all notifications
function showAllNotifications(notifications){
    notifications.forEach(notification => {
        const notificationElement = composeNotification(notification);
        mainElement.appendChild(notificationElement);
    })
}

//Remove all notifications
function removeAllNotifications(){
    const allNotificationsElements = document.querySelectorALl('notifications');
    allNotificationsElements.forEach(notification => notification.remove());
}

//Compose notification DOM element
function composeNotification(notification){
    //Notification
    const notificationElement = document.createElement('article');
    notificationElement.classList.add('notification');

    //Avatar
    const avatarElement = document.createElement('img');
    avatarElement.classList.add('avatar');
    avatarElement.alt = notification.name;
    avatarElement.src = notification.avatar;

    //Title
    const titleElement = document.createElement('h2');
    titleElement.classList.add('notification__title');
    let titleContent = `<strong>${notification.name}</strong> ${notification.content}`;
    if(notification.link === 'link'){
        titleContent += ` <a href="#" class="link link--${notification.meta.linkType}">${notification.meta.linkText}</a>`;
    }

    if(notification.unread){
        titleContent += `<span class="unread-bubble"></span>`;
    }

    //Control notifications states
    if(notification.unread){
        notificationElement.classList.add('notification--unread');
    }

    titleElement.innerHTML = titleContent;

    //Date
    const dateElement = document.createElement('p');
    dateElement.classList.add('date');
    dateElement.textContent = notification.date;

    //Compose DOM elements
    notificationElement.appendChild(avatarElement);
    notificationElement.appendChild(titleElement);
    notificationElement.appendChild(dateElement);

    //Message
    if(notification.type === 'message'){
        notificationElement.classList.add('notification--message');
        const messageElement = document.createElement('p');
        messageElement.classList.add('notification__message');
        messageElement.textContent = notification.meta.message;
        notificationElement.appendChild(messageElement);
    }

    //Picture
    if(notification.type === 'picture'){
        notificationElement.classList.add('notification--picture');
        const pictureElement = document.createElement('img');
        pictureElement.classList.add('notification__picture');
        pictureElement.src = notification.meta.picture;
        notificationElement.appendChild(pictureElement);
    }

    return notificationElement;
}


//Go
showAllNotifications(NotificationCollection);

