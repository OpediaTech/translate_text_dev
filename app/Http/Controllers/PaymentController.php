<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe;
use Session;
use App\Models\PaymentModel;
use Str;
use Image;
use App\Models\ServiceItemsChanges;

class PaymentController extends Controller
{
    public function index()
    {
        $items = ServiceItemsChanges::all();
        $id = $items[0]->id;
        $data = ServiceItemsChanges::findOrFail($id);
        return view('index',compact('data'));
    }
  
    public function makePayment(Request $request)
    {


        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        Stripe\Charge::create ([
                "amount" => $request->grand_total * 100,
                "currency" => "usd",
                "source" => $request->stripeToken,
                "description" => $request->Notes
        ]);
        Session::flash('success', 'Payment successfully made.');

        //  insertion image 

        $paymentModel = new PaymentModel();
        $paymentModel->fname = $request->fname;
        $paymentModel->lname = $request->lname;
        $paymentModel->email = $request->email;
        $paymentModel->password = $request->password;
        $paymentModel->translate_type = $request->translate_type;
        $paymentModel->translate_from = $request->translate_from;
        $paymentModel->translate_to = $request->translate_to;
        $paymentModel->word_count = $request->word_count;
        $paymentModel->page_count = $request->page_count;
        $paymentModel->translated_file = $request->translated_file;
        $paymentModel->days = $request->days;
        $paymentModel->extra_service = $request->extra_service;
        $paymentModel->payment_type = $request->payment_type;
        $paymentModel->Notes = $request->Notes;
        $paymentModel->grand_total = $request->grand_total;
        $paymentModel->save();

   
     
        return back();
    }


    public function get_order_data(Request $request){
     

        $data = new PaymentModel();
        $data->fname = $request->formData['fname'];
        $data->lname = $request->formData['lname'];
        $data->email = $request->formData['email'];
        $data->password = $request->formData['password'];
        $data->translate_type = $request->formData['translate_type'];
        $data->translate_from = $request->formData['translate_from'];
        $data->translate_to = $request->formData['translate_to'];
        $data->word_count =  $request->formData['word_count'];
        $data->page_count = $request->formData['page_count'];
        $data->translated_file = $request->formData['translated_file'];
        $data->days = $request->formData['days'];
        $data->extra_service = !empty($request->formData['extra_service']) ? json_encode($request->formData['extra_service']) : null;
        $data->payment_type = $request->formData['payment_type'];
        $data->Notes = $request->formData['Notes'];
        $data->grand_total = $request->amount['value'];
        $data->save();
        return $data;
    }




}
