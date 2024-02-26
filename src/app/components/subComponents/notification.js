'use client'
import {useEffect} from 'react';


function askNotificationPermission() {
    useEffect(() => {
        if (!('Notification' in window)) {
            return {result:'This browser does not support notifications.'}
        } else {
          Notification.requestPermission().then(permission => {
            return {result:permission}
          })
        }
    }, [])
    
}  

function showNotification(title, bodyText, img, silent, sound){
    useEffect(() => {
        if (!('Notification' in window)) {
            return {result:'This browser does not support notifications.'}
        } else {
            Notification.requestPermission().then(permission => {
              if(permission=='granted'){
                const a =sound
                const badge = ''
                
                if(a!='default' && !silent){
                    try{
                        const notification = new Notification(title, {
                            body: bodyText,
                            icon: img,
                            badge: badge,
                            silent: true
                        })
                        return {status:200, message:'Sent Successfully'}
                    }catch(err){
                        return {status:500, message:err}
                    }
                }else{
                    try{
                        const notification = new Notification(title, {
                            body: bodyText,
                            icon: img,
                            badge: badge,
                            silent: silent
                        })
                        return {status:200, message:'Sent Successfully'}
                    }catch(err){
                        return {status:500, message:err}
                    }
                }
                
              }
            })
        }
    }, []) 
}


function setNotificationCount (count){
    navigator.setAppBadge(count)
}

function clearNotificationCount (){
    navigator.clearAppBadge()
}


module.exports = {
    showNotification,
    setNotificationCount,
    clearNotificationCount,
    askNotificationPermission
}