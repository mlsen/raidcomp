#Raid Composer

##Socket Actions:


A client should listen on the sockets ```compId``` and ```compId:userId```  
Example  
```js
socket.on(compId + ':' + userId, function () { ... });
```

Client issueing socket actions need to use the socket ```raidcomp```  
Example  
```js
socket.emit('raidcomp', { action: ..., ... });
```


**Required params for all socket actions**

- action
- compId
- user


###Available Socket Actions

**addCharacter**  
**moveCharacter**  
**removeCharacter**  
**addRaid**  
**removeRaid**  
**requestNames**  
**sendName**  
