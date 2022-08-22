@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            
            <div class="card">
                <div class="card-body">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Edit
                    </button>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form action="{{route('update',$items[0]->id)}}" method="POST">
                                  @csrf
                                    <div class="mb-3">
                                      <label for="Translation1" class="form-label">Translation 1</label>
                                      <input type="text" name="t1" value="{{$data->t1}}" class="form-control" id="Translation1" placeholder="Translation type 1">
                                    </div>
                                    <div class="mb-3">
                                      <label for="Translation1_price" class="form-label">Translation1 Price</label>
                                      <input type="text" name="t1_price" value="{{$data->t1_price}}" class="form-control" id="Translation1_price"  placeholder="Translation type 1 price">
                                    </div>

                                    <div class="mb-3">
                                      <label for="Translation2" class="form-label">Translation 2</label>
                                      <input type="text" name="t2" class="form-control" value="{{$data->t2}}" id="Translation2" placeholder="Translation Type 2">
                                    </div>

                                    <div class="mb-3">
                                      <label for="Translation2_price" class="form-label">Translation2 Price</label>
                                      <input type="text" name="t2_price" value="{{$data->t2_price}}" class="form-control" id="Translation2_price" placeholder="Translation Type2 price">
                                    </div>
                                
                                    
                                    <div class="mb-3">
                                      <label for="Translation3" class="form-label">Translation 3</label>
                                      <input type="text" class="form-control" name="t3" value="{{$data->t3}}" id="Translation3" placeholder="Translation Type" >
                                    </div>

                                    <div class="mb-3">
                                      <label for="t3_price" class="form-label">Translation 3</label>
                                      <input type="text" name="t3_price" value="{{$data->t3_price}}" class="form-control" id="t3_price" placeholder="Translation type3 price">
                                    </div>

                                    <div class="mb-3">
                                      <label for="t1Ex1" class="form-label">Translation Extra1 Item</label>
                                      <input type="text" name="t1Ex1" value="{{$data->t1Ex1}}" class="form-control" id="t1Ex1" placeholder="Translation type">
                                    </div>
                                    <div class="mb-3">
                                      <label for="t1Ex1_price" class="form-label">Translation Extra1 price</label>
                                      <input type="text" name="t1Ex1_price" value="{{$data->t1Ex1_price}}" class="form-control" id="t1Ex1_price" placeholder="Translation type3 price">
                                    </div>

                                    <div class="mb-3">
                                      <label for="t1Ex2" class="form-label">Translation Extra2 Item</label>
                                      <input type="text" name="t1Ex2"  value="{{$data->t1Ex2}}" class="form-control" id="t1Ex2" placeholder="Translation ">
                                    </div>
                                    <div class="mb-3">
                                      <label for="t1Ex2_price" class="form-label">Translation Extra1 price</label>
                                      <input type="text" name="t1Ex2_price"  value="{{$data->t1Ex2_price}}" class="form-control" id="t1Ex2_price" placeholder="Translation type price">
                                    </div>

                                    <div class="mb-3">
                                      <label for="t2Ex" class="form-label">Translation type 2 Extra Item</label>
                                      <input type="text" name="t2Ex" value="{{$data->t2Ex}}" class="form-control" id="t2Ex" placeholder="Translation ">
                                    </div>
                                    <div class="mb-3">
                                      <label for="t2Ex_price" class="form-label">Translation type2 Extra price</label>
                                      <input type="text" name="t2Ex_price" value="{{$data->t2Ex_price}}" class="form-control" id="t2Ex_price" placeholder="Translation type price">
                                    </div>

                                    <div class="mb-3">
                                      <label for="t3Ex" class="form-label">Translation type 3 Extra Item</label>
                                      <input type="text" name="t3Ex" value="{{$data->t3Ex}}" class="form-control" id="t3Ex" placeholder="Translation ">
                                    </div>
                                    <div class="mb-3">
                                      <label for="t3Ex_price" class="form-label">Translation type3 Extra price</label>
                                      <input type="text" name="t3Ex_price" value="{{$data->t3Ex_price}}" class="form-control" id="t3Ex_price" placeholder="Translation type price">
                                    </div>

                                  
                                
                                    <button type="submit" class="btn btn-primary">Update</button>
                                  </form>

                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {{-- <button type="button" class="btn btn-primary">Save changes</button> --}}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
         

                <div class="card-header">{{ __('Items') }}</div>
           
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <table class="table">
                        <thead>
                          @foreach ($items as $item)
                          <tr>
                            <th scope="col">{{$item->t1}}</th>
                            <td scope="col">{{$item->t1_price}}</td>
                          </tr>
                          <tr>
                            <th scope="col">{{$item->t2}}</th>
                            <td scope="col">{{$item->t2_price}}</td>
                          </tr>
                          <tr>
                            <th scope="col">{{$item->t3}}</th>
                            <td scope="col">{{$item->t3_price}}</td>
                          </tr>
                          <tr>
                            <th scope="col">{{$item->t1Ex1}}</th>
                            <td scope="col">{{$item->t1Ex1_price}}</td>
                          </tr>
                          <tr>
                            <th scope="col">{{$item->t1Ex2}}</th>
                            <td scope="col">{{$item->t1Ex2_price}}</td>
                          </tr>
                          <tr>
                            <th scope="col">{{$item->t2Ex}}</th>
                            <td scope="col">{{$item->t2Ex_price}}</td>
                          </tr>
                          <tr>
                            <th scope="col">{{$item->t3Ex}}</th>
                            <td scope="col">{{$item->t3Ex_price}}</td>
                          </tr>
                   
                          @endforeach
                        </thead>
                  
                      </table>
                </div>
            </div>

            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Fname</th>
                            <th scope="col">Lname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Service Type</th>
                            <th scope="col">Translate From</th>
                            <th scope="col">Translate to</th>
                            <th scope="col">Pages</th>
                            <th scope="col">Words</th>
                            <th scope="col">Days</th>
                            <th scope="col">Extra Service</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                            @foreach ($orders as $item)
                            <tr>
                                <th scope="row">{{$item->id}}</th>
                                <td>{{$item->fname}}</td>
                                <td>{{$item->lname}}</td>
                                <td>{{$item->email}}</td>
                                <td>{{$item->translate_type}}</td>
                                <td>{{$item->translate_from}}</td>
                                <td>{{$item->translate_to}}</td>
                                <td>{{$item->page_count}}</td>
                                <td>{{$item->word_count}}</td>
                                <td>{{$item->days}}</td>
                                <td>{{$item->extra_service}}</td>
                                <td>{{$item->payment_type}}</td>
                                <td>{{$item->Notes}}</td>
                                <td>{{$item->grand_total}}</td>
                              </tr>
                            @endforeach
                         
                          
                        </tbody>
                      </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
