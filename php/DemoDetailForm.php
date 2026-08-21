<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *'); // Update with your actual frontend URL using HTTPS
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('SameSite=None; Secure'); // Include this line to allow cross-origin requests in both secure and non-secure contexts

// $conn = mysqli_connect('localhost', 'uncodemylandingpage', 'OkWRwPEJY0sT', 'uncodemylandingpage');
$conn = mysqli_connect('ucdb.cbutm1vn3zay.eu-north-1.rds.amazonaws.com', 'admin', 'UCDatabase8434', 'ucdatabase');


if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
   
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $name = $_POST['name'];
        $email = $_POST['email'];
        $mobile = $_POST['mobile'];
        $course = $_POST['course'];
        $date = $_POST['date'];
        $fromTime = $_POST['fromTime'];
        $toTime = $_POST['toTime'];

        // $sql = "INSERT INTO Demoincontactform (name, email, mobile, course, date, fromTime, toTime) VALUES ('$name', '$email', '$mobile', '$course', '$date', '$fromTime', '$toTime')";
        $sql = "INSERT INTO demodetail (name, email, mobile, course, date, fromTime, toTime) VALUES ('$name', '$email', '$mobile', '$course', '$date', '$fromTime', '$toTime')";
        $res = mysqli_query($conn, $sql);

        if ($res) {
            
            $activeCampaignUrl = 'https://uncodemyadmission.activehosted.com/api/3/contacts';
           
            $apiToken = '3a2f24bd72b5b8bce20c92fd9e7c456eb9de7a487ea04f58ed4e1ad6203dd9cc94e2065b';
            $listId = 2; // Replace with your actual list ID

            // Use the custom field IDs retrieved earlier
            $postData = array(
                'contact' => array(
                    'email' => $email,
                    'phone' => $mobile,
                    'firstName' => $name,
                    'fieldValues' => array(
                        array(
                            'field' => 1, // ID for 'course'
                            'value' => $course // Assuming you have a value for the course
                        )
                       
                    )
                )
            );

            $postDataJson = json_encode($postData);

            $options = array(
                'http' => array(
                    'header' => "Content-Type: application/json\r\n" .
                                "Api-Token: $apiToken\r\n",
                    'method' => 'POST',
                    'content' => $postDataJson
                )
            );

            $context = stream_context_create($options);
            $result = @file_get_contents($activeCampaignUrl, false, $context);

            if($result===false){
                $error = error_get_last();
                // Log or handle the error as needed
                echo true;
            }

            if ($result !== false) {
                $response = json_decode($result, true);
                if (isset($response['contact']['id'])) {
                    $contactId = $response['contact']['id'];

                    // Add the contact to the list
                   
                    $contactListUrl = 'https://uncodemyadmission.activehosted.com/api/3/contactLists';
                    $contactListData = array(
                        'contactList' => array(
                            'list' => $listId,
                            'contact' => $contactId,
                            'status' => 1 // 1 for active
                        )
                    );
                    $contactListDataJson = json_encode($contactListData);

                    $options = array(
                        'http' => array(
                            'header' => "Content-Type: application/json\r\n" .
                                        "Api-Token: $apiToken\r\n",
                            'method' => 'POST',
                            'content' => $contactListDataJson
                        )
                    );

                    $context = stream_context_create($options);
                    $result = file_get_contents($contactListUrl, false, $context);

                    if ($result !== false) {
                        // Successfully added contact to the list
                        echo true;
                    } else {
                        // Failed to add contact to the list
                        echo true;
                        // echo json_encode(array('error' => 'Failed to add contact to the list'));
                    }
                } else {
                    // Failed to get contact ID
                    echo true;
                    // echo json_encode(array('error' => 'Failed to retrieve contact ID from ActiveCampaign'));
                }
            } else {
                // Failed to send data to ActiveCampaign
                echo true;
                // echo json_encode(array('error' => 'Failed to send data to ActiveCampaign'));
            }
        } else {
            echo false;
        }
    }
}

$conn->close();
?>
