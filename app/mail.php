<?php


$errors = array();  	// array to hold validation errors
$data = array(); 		// array to pass back data


if(empty($_POST['email'])){
	$errors['email'] = 'Error: No email address found';
	exit;
}

if ( !empty($errors)) {
	$data['success'] = false;
	$data['errors']  = $errors;
} else {
	$senderMain			= (!empty($_POST['type'])) ? $_POST['type'] : "";
	$senderPrenom		= (!empty($_POST['prenom'])) ? $_POST['prenom'] : "";
	$senderNom			= (!empty($_POST['nom'])) ? $_POST['nom'] : "";
	$senderNum			= (!empty($_POST['num'])) ? $_POST['num'] : "";
	$senderRue			= (!empty($_POST['rue'])) ? $_POST['rue'] : "";
	$senderVille		= (!empty($_POST['ville'])) ? $_POST['ville'] : "";
	$senderPhone		= (!empty($_POST['telephone'])) ? $_POST['telephone'] : "";
	$senderEmail		= (!empty($_POST['email'])) ? $_POST['email'] : "";
	$senderMessage	= (!empty($_POST['commentaire'])) ? nl2br($_POST['commentaire']) : "";
	$senderReglement= (!empty($_POST['reglement'])) ? $_POST['reglement'] : "";
	$senderCommande	= (!empty($_POST['cart']['items'])) ? $_POST['cart']['items'] : null;
	$senderTotal		= (!empty($_POST['cart']['totalCost'])) ? $_POST['cart']['totalCost'] : "";

	$senderTypeResidence= (!empty($_POST['residence'])) ? $_POST['residence'] : "";
	$senderDigicode			= (!empty($_POST['digicode'])) ? $_POST['digicode'] : "";
	$senderBatiment			= (!empty($_POST['bat'])) ? $_POST['bat'] : "";
	$senderEtage				= (!empty($_POST['etage'])) ? $_POST['etage'] : "";
	$senderInfos				= (!empty($_POST['infos'])) ? $_POST['infos'] : "";
	$senderHT = $senderTotal / (1 + (5.5/100));
	$senderTVA = $senderTotal - $senderHT;
	$senderHT = floor($senderHT * 100) / 100;
	$senderTVA = floor($senderTVA * 100) / 100;
	if(!empty($senderCommande)){
		$senderCommandeText = "<table>";
		foreach ($senderCommande as $key => $value) {
			$senderCommandeText .= "<tr>";
			$senderCommandeText .= "<td>". $value["quantity"] ."<td>" ;
			$senderCommandeText .= "<td>". $value["name"] ." - ". $value["data"] ."<td>" ;
			$senderCommandeText .= "<td>". $value["total"] ." €<td>" ;
			$senderCommandeText .= "</tr>";
		}
		$senderCommandeText .= "</table>";
	}


	$siteName		= "www.ileauxpizzas.fr";

	$headersPizza  = "MIME-Version: 1.0\r\n";
	$headersPizza .= "Content-type: text/html; charset=utf-8\r\n";
	$headersPizza .= 'From: Restaurant L Ile Aux Pizzas <commande@ileauxpizzas.fr>' . "\r\n";
	//$toPizza 			= "commande@ileauxpizzas.fr";
	$toPizza 			= "arnaud.ritti@gmail.com";
	$toSubjectPizza 		= "Une commande a été effectuée sur le site $siteName !";
	$emailBodyPizza 		= "<html>
					Commande de M. ou Mme  $senderNom  <br /> <br />

				   Type de commande : $senderMain <br />  <br />

				   Téléphone : 	$senderPhone - Email : $senderEmail <br />
				   Adresse : 	  $senderNum $senderRue  <br />
				   Commune : 		$senderVille <br /> <br />

				   Type de résidence :  $senderTypeResidence <br />
				   Digicode : $senderDigicode <br />
				   Bâtiment / Appartement : $senderBatiment <br />
				   Etage : $senderEtage <br />
				   Informations supplémentaires : $senderInfos <br /> <br />

				   Message : 	  $senderMessage €<br /> <br />
				   Montant total : $senderTotal €<br />
				   Mode de réglement : $senderReglement	€<br /> <br />

				   Détail de la commande : <br />
				   $senderCommandeText </html>";
	$messagePizza 		= $emailBodyPizza;
	$okPizza = mail($toPizza, $toSubjectPizza, $messagePizza, $headersPizza);

	$headersClient  = "MIME-Version: 1.0\r\n";
	$headersClient .= "Content-type: text/html; charset=utf-8\r\n";
	$headersClient .= 'From: Restaurant L Ile Aux Pizzas <commande@ileauxpizzas.fr>' . "\r\n";
	$toClient 			=  "$senderEmail";
	$toSubjectClient 		= "Votre commande a bien ete prise en compte sur le site $siteName !";
	$emailBodyClient 		= "<html>
					Toute l'équipe de \"l'Ile Aux Pizzas\" vous remercie ! <br />
					Votre commande sera prête dans les meilleurs délais. <br /> <br />

					::::: FACTURE ::::: <br /> <br />

					Nom : $senderNom $senderPrenom  <br />
				  Adresse : $senderNum $senderRue $senderVille <br />
				  Telephone : $senderPhone - Email : $senderEmail <br /> <br />

				  Type de commande : $senderMain <br />  <br />

				  Détail de la commande : <br />
				  $senderCommandeText <br />  <br />

				  Montant HT : $senderHT €<br />
				  TVA (5,5%) : $senderTVA €<br />
				  Montant total TTC : $senderTotal €<br /> <br />

				  Mode de règlement : $senderReglement	<br /> <br /></html>";
	$messageClient 		= $emailBodyClient;
	$okClient = mail($toClient, $toSubjectClient, $messageClient, $headersClient);


	if($okPizza && $okClient){
		$data['success'] = true;
		$data['message'] = 'Votre commande a bien ete prise en compte';
	}else{
		$data['success'] = false;
		$data['message'] = "Une erreur c'est produite";
	}
}
echo json_encode($data);
?>
