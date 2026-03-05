# tp2

capture d'écrans pour chacuns des scénarios demandés

1 GET /api/users → vérifiez que les 3 utilisateurs initiaux sont retournés (code 200) 
![Alt text](assets/img/scénario1.png)
2 POST /api/users → créez un nouvel utilisateur, notez l'id retourné (code 201) 
![Alt text](assets/img/scénario2.png)
3 GET /api/users/:id → récupérez l'utilisateur créé avec son id (code 200) 
![Alt text](assets/img/scénario3.png)
4 PUT /api/users/:id → modifiez le rôle de cet utilisateur (code 200) 
![Alt text](assets/img/scénario4.png)
5 GET /api/users → vérifiez que la liste contient maintenant 4 utilisateurs (code 200) 
![Alt text](assets/img/scénario5.png)
6 DELETE /api/users/:id → supprimez l'utilisateur créé (code 204) 
![Alt text](assets/img/scénario6.png)
7 GET /api/users/:id → tentez de récupérer l'utilisateur supprimé (code 404) 
![Alt text](assets/img/scénario7.png)